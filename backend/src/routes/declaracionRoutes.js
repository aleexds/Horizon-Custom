// backend/src/routes/declaracionRoutes.js
import { Router } from 'express';
import {
  getDeclaraciones,
  getRetenidos,
  createDeclaracion,
  getCatalogos
} from '../controllers/declaracionController.js';

const router = Router();

router.get('/declaraciones', getDeclaraciones);
router.get('/inventario/retenidos', getRetenidos);
router.get('/catalogos', getCatalogos);
router.post('/declaraciones', createDeclaracion);

export default router;