import { Request, Response } from 'express';
import { Imovel } from '../models/Imovel';
import { Lead } from '../models/Lead';
import { Depoimento } from '../models/Depoimento';
import { gerarSlugUnico } from '../services/SlugService';
import { removerFoto } from '../services/CloudinaryService';
import { uploadParaCloudinary } from '../middleware/upload';
import { Op } from 'sequelize';
import { startOfMonth, endOfMonth } from '../utils/dates';

export async function listarImoveisAdmin(req: Request, res: Response): Promise<void> {
  const imoveis = await Imovel.findAll({
    paranoid: false,
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['descricao'] }
  });
  res.json(imoveis);
}

export async function criarImovel(req: Request, res: Response): Promise<void> {
  const dados = req.body;
  const slug = await gerarSlugUnico(dados.titulo);

  const imovel = await Imovel.create({ ...dados, slug, fotos: [], fotoPrincipal: '' });
  res.status(201).json(imovel);
}

export async function atualizarImovel(req: Request, res: Response): Promise<void> {
  const imovel = await Imovel.findByPk(req.params.id);
  if (!imovel) {
    res.status(404).json({ error: 'Imóvel não encontrado' });
    return;
  }

  const dados = req.body;
  if (dados.titulo && dados.titulo !== imovel.titulo) {
    dados.slug = await gerarSlugUnico(dados.titulo, imovel.id);
  }

  await imovel.update(dados);
  res.json(imovel);
}

export async function removerImovel(req: Request, res: Response): Promise<void> {
  const imovel = await Imovel.findByPk(req.params.id);
  if (!imovel) {
    res.status(404).json({ error: 'Imóvel não encontrado' });
    return;
  }

  await imovel.destroy();
  res.status(204).send();
}

export async function adicionarFotos(req: Request, res: Response): Promise<void> {
  const imovel = await Imovel.findByPk(req.params.id);
  if (!imovel) {
    res.status(404).json({ error: 'Imóvel não encontrado' });
    return;
  }

  const arquivos = req.files as Express.Multer.File[];
  if (!arquivos?.length) {
    res.status(422).json({ error: 'Nenhuma foto enviada' });
    return;
  }

  const novasUrls = await Promise.all(
    arquivos.map(f => uploadParaCloudinary(f.buffer, 'luciana-mayre-imoveis'))
  );
  const fotosAtualizadas = [...imovel.fotos, ...novasUrls];
  const fotoPrincipal = imovel.fotoPrincipal || novasUrls[0];

  await imovel.update({ fotos: fotosAtualizadas, fotoPrincipal });
  res.json({ fotos: fotosAtualizadas, fotoPrincipal });
}

export async function removerFotoImovel(req: Request, res: Response): Promise<void> {
  const imovel = await Imovel.findByPk(req.params.id);
  if (!imovel) {
    res.status(404).json({ error: 'Imóvel não encontrado' });
    return;
  }

  const { url } = req.body;
  if (!url) {
    res.status(422).json({ error: 'URL da foto é obrigatória' });
    return;
  }

  await removerFoto(url);

  const fotosRestantes = imovel.fotos.filter(f => f !== url);
  const fotoPrincipal = imovel.fotoPrincipal === url
    ? (fotosRestantes[0] ?? '')
    : imovel.fotoPrincipal;

  await imovel.update({ fotos: fotosRestantes, fotoPrincipal });
  res.json({ fotos: fotosRestantes, fotoPrincipal });
}

export async function dashboardStats(req: Request, res: Response): Promise<void> {
  const [totalAtivos, emDestaque, leadsEsteMes] = await Promise.all([
    Imovel.count({ where: { ativo: true } }),
    Imovel.count({ where: { ativo: true, destaque: true } }),
    Lead.count({
      where: {
        createdAt: { [Op.between]: [startOfMonth(), endOfMonth()] }
      }
    })
  ]);

  res.json({ totalAtivos, emDestaque, leadsEsteMes });
}

export async function listarLeads(req: Request, res: Response): Promise<void> {
  const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] });
  res.json(leads);
}

export async function listarDepoimentosAdmin(req: Request, res: Response): Promise<void> {
  const depoimentos = await Depoimento.findAll({ order: [['createdAt', 'DESC']] });
  res.json(depoimentos);
}

export async function criarDepoimento(req: Request, res: Response): Promise<void> {
  const depoimento = await Depoimento.create(req.body);
  res.status(201).json(depoimento);
}

export async function atualizarDepoimento(req: Request, res: Response): Promise<void> {
  const depoimento = await Depoimento.findByPk(req.params.id);
  if (!depoimento) {
    res.status(404).json({ error: 'Depoimento não encontrado' });
    return;
  }
  await depoimento.update(req.body);
  res.json(depoimento);
}

export async function removerDepoimento(req: Request, res: Response): Promise<void> {
  const depoimento = await Depoimento.findByPk(req.params.id);
  if (!depoimento) {
    res.status(404).json({ error: 'Depoimento não encontrado' });
    return;
  }
  await depoimento.destroy();
  res.status(204).send();
}
