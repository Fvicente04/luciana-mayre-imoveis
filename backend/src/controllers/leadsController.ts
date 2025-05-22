import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Lead } from '../models/Lead';

export const validarLead = [
  body('nomeContato').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('telefone').trim().notEmpty().withMessage('Telefone é obrigatório'),
  body('mensagem').trim().notEmpty().withMessage('Mensagem é obrigatória'),
  body('canal').optional().isIn(['formulario', 'whatsapp'])
];

export async function registrarLead(req: Request, res: Response): Promise<void> {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    res.status(422).json({ errors: erros.array() });
    return;
  }

  const { nomeContato, telefone, mensagem, imovelId, imovelTitulo, canal } = req.body;

  const lead = await Lead.create({
    nomeContato,
    telefone,
    mensagem,
    imovelId: imovelId || null,
    imovelTitulo: imovelTitulo || null,
    canal: canal || 'formulario'
  });

  res.status(201).json({ id: lead.id });
}
