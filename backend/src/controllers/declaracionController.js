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
    const { numero_dua, fecha, regimen, estado, id_importador, id_agente, id_pais_origen } = req.body;

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
      id_importador: id_importador ? Number(id_importador) : null,
      id_agente: id_agente ? Number(id_agente) : null,
      id_pais_origen: id_pais_origen ? Number(id_pais_origen) : null
    });

    res.status(201).json({ success: true, data: nuevaDeclaracion });
  } catch (error) {
    console.error('Error al insertar en Supabase:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error al registrar la declaración' 
    });
  }
};