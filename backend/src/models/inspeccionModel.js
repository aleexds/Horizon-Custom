// backend/src/models/inspeccionModel.js
import { supabase } from '../config/supabase.js';

export const InspeccionModel = {
  // Obtener todas las inspecciones con sus relaciones de DUA y Funcionario
  async getAll() {
    const { data, error } = await supabase
      .from('inspeccion')
      .select(`
        id_inspeccion,
        fecha_inspeccion,
        tipo_inspeccion,
        resultado,
        observaciones,
        declaracion (numero_dua, regimen, estado),
        funcionario (nombre, cargo)
      `)
      .order('fecha_inspeccion', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Obtener catálogo de funcionarios para el formulario
  async getFuncionarios() {
    const { data, error } = await supabase
      .from('funcionario')
      .select('id_funcionario, nombre, cargo')
      .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Insertar una nueva inspección
  async create(nuevaInspeccion) {
    const { data, error } = await supabase
      .from('inspeccion')
      .insert([nuevaInspeccion])
      .select();

    if (error) throw error;
    return data[0];
  }
};