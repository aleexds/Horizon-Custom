// frontend/src/components/InspeccionesTable.jsx
export default function InspeccionesTable({ inspecciones }) {
  if (!inspecciones || inspecciones.length === 0) {
    return <p style={{ color: '#64748b' }}>No hay registros de inspecciones aduaneras.</p>;
  }

  const getBadgeStyle = (resultado) => {
    const isAprobado = resultado === 'Aprobada' || resultado === 'Conforme';
    return {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: 600,
      backgroundColor: isAprobado ? '#dcfce7' : '#fee2e2',
      color: isAprobado ? '#166534' : '#991b1b',
      border: `1px solid ${isAprobado ? '#bbf7d0' : '#fecaca'}`
    };
  };

  return (
    <div style={{ overflowX: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
          <tr>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Nº DUA</th>
            <th style={{ padding: '12px' }}>Fecha</th>
            <th style={{ padding: '12px' }}>Tipo</th>
            <th style={{ padding: '12px' }}>Funcionario Asignado</th>
            <th style={{ padding: '12px' }}>Resultado</th>
            <th style={{ padding: '12px' }}>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {inspecciones.map((insp) => (
            <tr key={insp.id_inspeccion} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>#{insp.id_inspeccion}</td>
              <td style={{ padding: '12px', fontWeight: 600, color: '#0369a1' }}>
                {insp.declaracion?.numero_dua || 'N/A'}
              </td>
              <td style={{ padding: '12px' }}>{insp.fecha_inspeccion}</td>
              <td style={{ padding: '12px' }}>{insp.tipo_inspeccion}</td>
              <td style={{ padding: '12px' }}>
                {insp.funcionario?.nombre ? `${insp.funcionario.nombre} (${insp.funcionario.cargo || 'Inspector'})` : 'Sin asignar'}
              </td>
              <td style={{ padding: '12px' }}>
                <span style={getBadgeStyle(insp.resultado)}>
                  {insp.resultado}
                </span>
              </td>
              <td style={{ padding: '12px', color: '#475569' }}>
                {insp.observaciones || 'Sin observaciones'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}