import { Router } from 'express';
import { listarImoveis, buscarImovel, imoveisSimilares, listarBairros } from '../controllers/imoveisController';
import { listarDepoimentos } from '../controllers/depoimentosController';
import { registrarLead, validarLead } from '../controllers/leadsController';

const router = Router();

router.get('/imoveis', listarImoveis);
router.get('/imoveis/bairros', listarBairros);
router.get('/imoveis/similares/:id', imoveisSimilares);
router.get('/imoveis/:id', buscarImovel);

router.get('/depoimentos', listarDepoimentos);

router.post('/leads', validarLead, registrarLead);

export default router;
