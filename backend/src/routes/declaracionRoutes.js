// backend/src/routes/declaracionRoutes.js
import { Router } from 'express';
import {
  getDeclaraciones,
  getRetenidos,
  createDeclaracion,
  getCatalogos,
  updateEstadoDeclaracion
} from '../controllers/declaracionController.js';

const router = Router();

router.get('/declaraciones', getDeclaraciones);
router.get('/inventario/retenidos', getRetenidos);
router.get('/catalogos', getCatalogos);
router.post('/declaraciones', createDeclaracion);
router.patch('/declaraciones/:id/estado', updateEstadoDeclaracion);

export default router;