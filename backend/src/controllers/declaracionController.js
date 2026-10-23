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

export const createDeclaracion = async (req, res) => {
  try {
    const { numero_dua, fecha, regimen, estado, id_importador, id_agente, id_pais, id_contenedor } = req.body;

    if (!numero_dua || !fecha || !regimen || !estado) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios (numero_dua, fecha, regimen, estado)'
      });
    }

    const nuevaDeclaracion = await DeclaracionModel.create({
      numero_dua,
      fecha,
      regimen,
      estado,
      id_importador: id_importador || null,
      id_agente: id_agente || null,
      id_pais: id_pais || null,
      id_contenedor: id_contenedor || null
    });

    res.status(201).json({ success: true, data: nuevaDeclaracion });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al registrar la declaración', error: error.message });
  }
};