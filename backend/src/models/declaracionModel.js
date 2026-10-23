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

  async getBodegasYProductos() {
    const [bodegas, productos] = await Promise.all([
      supabase.from('bodega').select('id_bodega, nombre, ubicacion').order('nombre'),
      supabase.from('producto').select('id_producto, descripcion, valor_unitario').order('descripcion')
    ]);

    if (bodegas.error) throw bodegas.error;
    if (productos.error) throw productos.error;

    return { bodegas: bodegas.data, productos: productos.data };
  },

  async createInventarioRetenido({ id_bodega, descripcion_producto, cantidad, valor_unitario, fecha_ingreso, estado }) {
    const descripcionLimpia = descripcion_producto.trim();
    const precio = Number(valor_unitario) || 0.00;

    // 1. Verificar si el producto ya existe
    const { data: productosEncontrados, error: searchError } = await supabase
      .from('producto')
      .select('id_producto, valor_unitario')
      .ilike('descripcion', descripcionLimpia)
      .limit(1);

    if (searchError) throw searchError;

    let id_producto = productosEncontrados && productosEncontrados.length > 0 
      ? productosEncontrados[0].id_producto 
      : null;

    // 2. Si no existe, tomar la categoría por defecto e insertarlo
    if (!id_producto) {
      const { data: categorias, error: catError } = await supabase
        .from('categoria_arancelaria')
        .select('id_categoria')
        .limit(1);

      if (catError) throw catError;
      
      const idCategoriaDefault = categorias && categorias.length > 0 
        ? categorias[0].id_categoria 
        : 1;

      const { data: nuevoProducto, error: prodError } = await supabase
        .from('producto')
        .insert([{
          descripcion: descripcionLimpia,
          valor_unitario: precio,
          id_categoria: idCategoriaDefault
        }])
        .select('id_producto');

      if (prodError) throw prodError;
      id_producto = nuevoProducto[0].id_producto;
    } else if (productosEncontrados[0].valor_unitario === 0 && precio > 0) {
      await supabase
        .from('producto')
        .update({ valor_unitario: precio })
        .eq('id_producto', id_producto);
    }

    // 3. Insertar el registro en inventario_bodega
    const { data, error } = await supabase
      .from('inventario_bodega')
      .insert([{
        id_bodega,
        id_producto,
        cantidad,
        fecha_ingreso,
        estado
      }])
      .select(`
        id_inventario,
        cantidad,
        fecha_ingreso,
        estado,
        bodega (id_bodega, nombre, ubicacion),
        producto (id_producto, descripcion, valor_unitario)
      `);

    if (error) throw error;
    return data[0];
  },

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