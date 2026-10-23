// backend/src/models/inspeccionModel.js
import { supabase } from '../config/supabase.js';

export const InspeccionModel = {
  async getAll() {
    const { data, error } = await supabase
      .from('inspeccion')
      .select(`
        id_inspeccion,
        fecha,
        resultado,
        observaciones,
        declaracion (numero_dua, regimen, estado),
        funcionario (nombre, cargo)
      `)
      .order('fecha', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getFuncionarios() {
    const { data, error } = await supabase
      .from('funcionario')
      .select('id_funcionario, nombre, cargo')
      .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
  },

  async create(nuevaInspeccion) {
    const { data, error } = await supabase
      .from('inspeccion')
      .insert([nuevaInspeccion])
      .select();

    if (error) throw error;
    return data[0];
  }
};