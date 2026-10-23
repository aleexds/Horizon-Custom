// backend/src/routes/declaracionRoutes.js
import { Router } from 'express';
import {
  getDeclaraciones,
  getRetenidos,
  createDeclaracion,
  getCatalogos,
  updateEstadoDeclaracion,
  getCatalogosInventario,
  createRetenido,
  updateEstadoInventario
} from '../controllers/declaracionController.js';

const router = Router();

router.get('/declaraciones', getDeclaraciones);
router.get('/inventario/retenidos', getRetenidos);
router.get('/catalogos', getCatalogos);
router.post('/declaraciones', createDeclaracion);
router.patch('/declaraciones/:id/estado', updateEstadoDeclaracion);

// Rutas para mercancía retenida
router.get('/inventario/catalogos', getCatalogosInventario);
router.post('/inventario/retenidos', createRetenido);
router.patch('/inventario/retenidos/:id/estado', updateEstadoInventario);

export default router;