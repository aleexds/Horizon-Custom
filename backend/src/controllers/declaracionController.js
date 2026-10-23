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

// Agrega estas dos funciones al final de backend/src/controllers/declaracionController.js
export const getCatalogos = async (req, res) => {
  try {
    const [importadores, paises] = await Promise.all([
      DeclaracionModel.getImportadores(),
      DeclaracionModel.getPaises()
    ]);

    res.status(200).json({
      success: true,
      data: { importadores, paises }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener catálogos',
      error: error.message
    });
  }
};

// Agrega esta función al final de backend/src/controllers/declaracionController.js
export const updateEstadoDeclaracion = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({
        success: false,
        message: 'El campo estado es requerido'
      });
    }

    const declaracionActualizada = await DeclaracionModel.updateEstado(id, estado);

    res.status(200).json({
      success: true,
      message: 'Estado actualizado correctamente',
      data: declaracionActualizada
    });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar el estado de la declaración'
    });
  }
};

// Añadir al final de backend/src/controllers/declaracionController.js
export const getCatalogosInventario = async (req, res) => {
  try {
    const catalogos = await DeclaracionModel.getBodegasYProductos();
    res.status(200).json({ success: true, data: catalogos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener bodegas y productos', error: error.message });
  }
};

export const createRetenido = async (req, res) => {
  try {
    const { id_bodega, descripcion_producto, cantidad, valor_unitario, fecha_ingreso, estado } = req.body;

    if (!id_bodega || !descripcion_producto || !cantidad) {
      return res.status(400).json({ 
        success: false, 
        message: 'Faltan campos obligatorios (id_bodega, descripcion_producto, cantidad)' 
      });
    }

    const nuevoItem = await DeclaracionModel.createInventarioRetenido({
      id_bodega: Number(id_bodega),
      descripcion_producto,
      cantidad: Number(cantidad),
      valor_unitario: Number(valor_unitario) || 0.00,
      fecha_ingreso: fecha_ingreso || new Date().toISOString().split('T')[0],
      estado: estado || 'Retenido'
    });

    res.status(201).json({ success: true, data: nuevoItem });
  } catch (error) {
    console.error('Error al registrar retención:', error);
    res.status(500).json({ success: false, message: error.message || 'Error al registrar retención' });
  }
};

export const updateEstadoInventario = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ success: false, message: 'El campo estado es requerido' });
    }

    const itemActualizado = await DeclaracionModel.updateEstadoInventario(id, estado);
    res.status(200).json({ success: true, data: itemActualizado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error al actualizar inventario' });
  }
};