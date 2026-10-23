// backend/src/routes/declaracionRoutes.js
import { Router } from 'express';
import { getDeclaraciones, getRetenidos } from '../controllers/declaracionController.js';

const router = Router();

// Endpoint para obtener todas las declaraciones aduaneras
router.get('/declaraciones', getDeclaraciones);

// Endpoint para consultar inventario retenido en bodegas
router.get('/inventario/retenidos', getRetenidos);

export default router;