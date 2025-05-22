import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { uploadFotos } from '../middleware/upload';
import { login } from '../controllers/authController';
import {
  listarImoveisAdmin,
  criarImovel,
  atualizarImovel,
  removerImovel,
  adicionarFotos,
  removerFotoImovel,
  dashboardStats,
  listarLeads,
  listarDepoimentosAdmin,
  criarDepoimento,
  atualizarDepoimento,
  removerDepoimento
} from '../controllers/adminImoveisController';

const router = Router();

router.post('/auth/login', login);

router.get('/admin/stats', requireAuth, dashboardStats);
router.get('/admin/leads', requireAuth, listarLeads);

router.get('/admin/imoveis', requireAuth, listarImoveisAdmin);
router.post('/admin/imoveis', requireAuth, criarImovel);
router.put('/admin/imoveis/:id', requireAuth, atualizarImovel);
router.delete('/admin/imoveis/:id', requireAuth, removerImovel);
router.post('/admin/imoveis/:id/fotos', requireAuth, uploadFotos.array('fotos', 20), adicionarFotos);
router.delete('/admin/imoveis/:id/fotos', requireAuth, removerFotoImovel);

router.get('/admin/depoimentos', requireAuth, listarDepoimentosAdmin);
router.post('/admin/depoimentos', requireAuth, criarDepoimento);
router.put('/admin/depoimentos/:id', requireAuth, atualizarDepoimento);
router.delete('/admin/depoimentos/:id', requireAuth, removerDepoimento);

export default router;
