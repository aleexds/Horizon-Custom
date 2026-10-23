// backend/src/controllers/declaracionController.js
import { DeclaracionModel } from '../models/declaracionModel.js';

export const getDeclaraciones = async (req, res) => {
  try {
    const declaraciones = await DeclaracionModel.getAll();
    res.status(200).json({ success: true, data: declaraciones });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener declaraciones', error: error.message });
  }
};

export const getRetenidos = async (req, res) => {
  try {
    const retenidos = await DeclaracionModel.getRetenidos();
    res.status(200).json({ success: true, data: retenidos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener inventario retenido', error: error.message });
  }
};