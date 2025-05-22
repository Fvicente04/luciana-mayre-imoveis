import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';

export async function login(req: Request, res: Response): Promise<void> {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(422).json({ error: 'Email e senha são obrigatórios' });
    return;
  }

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    res.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }

  const senhaValida = await admin.verificarSenha(senha);
  if (!senhaValida) {
    res.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }

  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  res.json({ token });
}
