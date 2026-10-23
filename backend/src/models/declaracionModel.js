// backend/src/models/declaracionModel.js
import { supabase } from '../config/supabase.js';

export const DeclaracionModel = {
  // Obtener todas las declaraciones con sus relaciones
  async getAll() {
    const { data, error } = await supabase
      .from('declaracion')
      .select(`
        id_declaracion,
        numero_dua,
        fecha,
        regimen,
        estado,
        importador (nombre_razon_social, identificacion_fiscal),
        agente_aduanal (nombre, numero_licencia),
        pais (nombre, codigo_iso),
        contenedor (numero_contenedor, tipo, peso_kg),
        detalle_declaracion (
          cantidad,
          valor_declarado,
          producto (descripcion, valor_unitario)
        )
      `);

    if (error) throw error;
    return data;
  },

  // Obtener inventario retenido en bodegas
  async getRetenidos() {
    const { data, error } = await supabase
      .from('inventario_bodega')
      .select(`
        id_inventario,
        cantidad,
        fecha_ingreso,
        estado,
        bodega (nombre, ubicacion),
        producto (descripcion, valor_unitario)
      `)
      .eq('estado', 'Retenido');

    if (error) throw error;
    return data;
  }
};