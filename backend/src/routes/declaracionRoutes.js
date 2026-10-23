// backend/src/routes/declaracionRoutes.js
import { Router } from 'express';
import {
  getDeclaraciones,
  getRetenidos,
  createDeclaracion
} from '../controllers/declaracionController.js';

const router = Router();

// Rutas GET existentes
router.get('/declaraciones', getDeclaraciones);
router.get('/inventario/retenidos', getRetenidos);

// Nueva ruta POST para registrar declaraciones
router.post('/declaraciones', createDeclaracion);

export default router;