// frontend/src/components/DeclaracionesTable.jsx
export default function DeclaracionesTable({ declaraciones, onCambiarEstado }) {
  if (!declaraciones || declaraciones.length === 0) {
    return <p style={{ color: '#64748b' }}>No hay declaraciones registradas.</p>;
  }

  const getBadgeStyle = (estado) => {
    const isLiberada = estado === 'Liberada';
    return {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: 600,
      backgroundColor: isLiberada ? '#dcfce7' : '#fee2e2',
      color: isLiberada ? '#166534' : '#991b1b',
      border: `1px solid ${isLiberada ? '#bbf7d0' : '#fecaca'}`
    };
  };

  return (
    <div style={{ overflowX: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
          <tr>
            <th style={{ padding: '12px' }}>Nº DUA</th>
            <th style={{ padding: '12px' }}>Fecha</th>
            <th style={{ padding: '12px' }}>Régimen</th>
            <th style={{ padding: '12px' }}>Origen</th>
            <th style={{ padding: '12px' }}>Importador</th>
            <th style={{ padding: '12px' }}>Estado</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {declaraciones.map((d) => {
            const isRetenida = d.estado === 'Retenida';
            const nuevoEstado = isRetenida ? 'Liberada' : 'Retenida';

            return (
              <tr key={d.id_declaracion} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{d.numero_dua}</td>
                <td style={{ padding: '12px' }}>{d.fecha}</td>
                <td style={{ padding: '12px' }}>{d.regimen}</td>
                <td style={{ padding: '12px' }}>
                  {d.pais ? `${d.pais.nombre} (${d.pais.codigo_iso})` : 'N/A'}
                </td>
                <td style={{ padding: '12px' }}>
                  {d.importador ? d.importador.nombre_razon_social : 'N/A'}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={getBadgeStyle(d.estado)}>{d.estado}</span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => onCambiarEstado(d.id_declaracion, nuevoEstado)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: isRetenida ? '#16a34a' : '#ea580c',
                      color: 'white'
                    }}
                  >
                    {isRetenida ? 'Liberar DUA' : 'Retener'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}