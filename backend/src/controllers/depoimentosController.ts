import { Request, Response } from 'express';
import { Depoimento } from '../models/Depoimento';

export async function listarDepoimentos(req: Request, res: Response): Promise<void> {
  const depoimentos = await Depoimento.findAll({
    where: { ativo: true },
    order: [['createdAt', 'DESC']]
  });

  res.json(depoimentos);
}
