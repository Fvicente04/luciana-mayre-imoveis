import { Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { Imovel } from '../models/Imovel';

export async function listarImoveis(req: Request, res: Response): Promise<void> {
  const {
    tipo,
    finalidade,
    precoMax,
    quartos,
    bairro,
    destaque,
    page = '1',
    limit = '12',
    q
  } = req.query;

  const where: WhereOptions = { ativo: true };

  if (tipo) where.tipo = tipo;
  if (finalidade) where.finalidade = finalidade;
  if (precoMax) where.preco = { [Op.lte]: Number(precoMax) };
  if (quartos) where.quartos = { [Op.gte]: Number(quartos) };
  if (bairro) where.bairro = { [Op.iLike]: `%${bairro}%` };
  if (destaque === 'true') where.destaque = true;

  if (q) {
    where[Op.or as unknown as string] = [
      { titulo: { [Op.iLike]: `%${q}%` } },
      { bairro: { [Op.iLike]: `%${q}%` } },
      { descricao: { [Op.iLike]: `%${q}%` } }
    ];
  }

  const pageNum = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(48, parseInt(limit as string));
  const offset = (pageNum - 1) * limitNum;

  const { count, rows } = await Imovel.findAndCountAll({
    where,
    limit: limitNum,
    offset,
    order: [['destaque', 'DESC'], ['createdAt', 'DESC']],
    attributes: { exclude: ['descricao', 'deletedAt'] }
  });

  res.json({
    total: count,
    pagina: pageNum,
    totalPaginas: Math.ceil(count / limitNum),
    imoveis: rows
  });
}

export async function buscarImovel(req: Request, res: Response): Promise<void> {
  const imovel = await Imovel.findOne({
    where: { id: req.params.id, ativo: true }
  });

  if (!imovel) {
    res.status(404).json({ error: 'Imóvel não encontrado' });
    return;
  }

  res.json(imovel);
}

export async function imoveisSimilares(req: Request, res: Response): Promise<void> {
  const imovel = await Imovel.findOne({
    where: { id: req.params.id, ativo: true }
  });

  if (!imovel) {
    res.status(404).json({ error: 'Imóvel não encontrado' });
    return;
  }

  const similares = await Imovel.findAll({
    where: {
      ativo: true,
      id: { [Op.ne]: imovel.id },
      [Op.or]: [
        { bairro: imovel.bairro },
        { tipo: imovel.tipo }
      ]
    },
    limit: 3,
    order: [['destaque', 'DESC'], ['createdAt', 'DESC']],
    attributes: { exclude: ['descricao', 'deletedAt'] }
  });

  res.json(similares);
}

export async function listarBairros(req: Request, res: Response): Promise<void> {
  const bairros = await Imovel.findAll({
    where: { ativo: true },
    attributes: ['bairro'],
    group: ['bairro'],
    order: [['bairro', 'ASC']]
  });

  res.json(bairros.map(i => i.bairro));
}
