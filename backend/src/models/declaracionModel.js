// backend/src/models/declaracionModel.js
import { supabase } from '../config/supabase.js';

export const DeclaracionModel = {
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
      `)
      .order('id_declaracion', { ascending: false });

    if (error) throw error;
    return data;
  },

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
  },

  async create(nuevaDeclaracion) {
    const { data, error } = await supabase
      .from('declaracion')
      .insert([nuevaDeclaracion])
      .select();

    if (error) throw error;
    return data[0];
  },

  async getImportadores() {
    const { data, error } = await supabase
      .from('importador')
      .select('id_importador, nombre_razon_social')
      .order('nombre_razon_social', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getPaises() {
    const { data, error } = await supabase
      .from('pais')
      .select('id_pais, nombre, codigo_iso')
      .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
  },

  async updateEstado(id, nuevoEstado) {
    const { data, error } = await supabase
      .from('declaracion')
      .update({ estado: nuevoEstado })
      .eq('id_declaracion', id)
      .select();

    if (error) throw error;
    return data[0];
  }
};