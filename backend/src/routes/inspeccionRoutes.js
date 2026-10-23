// backend/src/routes/inspeccionRoutes.js
import { Router } from 'express';
import {
  getInspecciones,
  getFuncionarios,
  createInspeccion
} from '../controllers/inspeccionController.js';

const router = Router();

router.get('/inspecciones', getInspecciones);
router.get('/funcionarios', getFuncionarios);
router.post('/inspecciones', createInspeccion);

export default router;