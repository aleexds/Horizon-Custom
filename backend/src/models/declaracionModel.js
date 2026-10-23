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
        bodega (id_bodega, nombre, ubicacion),
        producto (id_producto, descripcion, valor_unitario)
      `)
      .order('id_inventario', { ascending: false });

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
  },

  // Obtener catálogos para retención
  async getBodegasYProductos() {
    const [bodegas, productos] = await Promise.all([
      supabase.from('bodega').select('id_bodega, nombre, ubicacion').order('nombre'),
      supabase.from('producto').select('id_producto, descripcion, valor_unitario').order('descripcion')
    ]);

    if (bodegas.error) throw bodegas.error;
    if (productos.error) throw productos.error;

    return { bodegas: bodegas.data, productos: productos.data };
  },

  // Registrar mercancía en bodega
  async createInventarioRetenido(nuevoItem) {
    const { data, error } = await supabase
      .from('inventario_bodega')
      .insert([nuevoItem])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Cambiar estado en inventario (Liberar lote de bodega)
  async updateEstadoInventario(id, nuevoEstado) {
    const { data, error } = await supabase
      .from('inventario_bodega')
      .update({ estado: nuevoEstado })
      .eq('id_inventario', id)
      .select();

    if (error) throw error;
    return data[0];
  }
};