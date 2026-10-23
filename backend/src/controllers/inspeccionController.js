// backend/src/controllers/inspeccionController.js
import { InspeccionModel } from '../models/inspeccionModel.js';

export const getInspecciones = async (req, res) => {
  try {
    const inspecciones = await InspeccionModel.getAll();
    res.status(200).json({ success: true, data: inspecciones });
  } catch (error) {
    console.error('Error al consultar inspecciones en Supabase:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error al obtener inspecciones' 
    });
  }
};

export const getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await InspeccionModel.getFuncionarios();
    res.status(200).json({ success: true, data: funcionarios });
  } catch (error) {
    console.error('Error al consultar funcionarios en Supabase:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error al obtener funcionarios' 
    });
  }
};

export const createInspeccion = async (req, res) => {
  try {
    const { 
      id_declaracion, 
      id_funcionario, 
      fecha, 
      resultado, 
      observaciones 
    } = req.body;

    if (!id_declaracion || !id_funcionario || !resultado) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios (id_declaracion, id_funcionario, resultado)'
      });
    }

    const nuevaInspeccion = await InspeccionModel.create({
      id_declaracion: Number(id_declaracion),
      id_funcionario: Number(id_funcionario),
      fecha: fecha || new Date().toISOString().split('T')[0],
      resultado,
      observaciones: observaciones || ''
    });

    res.status(201).json({ success: true, data: nuevaInspeccion });
  } catch (error) {
    console.error('Error al registrar inspección en Supabase:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error al registrar la inspección' 
    });
  }
};