// frontend/src/components/DeclaracionesTable.jsx
export default function DeclaracionesTable({ declaraciones }) {
  if (!declaraciones || declaraciones.length === 0) {
    return <p style={{ color: '#64748b' }}>No hay declaraciones registradas.</p>;
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>N° DUA</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Fecha</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Régimen</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Origen</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Importador</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {declaraciones.map((d) => (
            <tr key={d.id_declaracion} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>{d.numero_dua}</td>
              <td style={{ padding: '10px' }}>{d.fecha}</td>
              <td style={{ padding: '10px' }}>{d.regimen}</td>
              <td style={{ padding: '10px' }}>{d.pais?.nombre} ({d.pais?.codigo_iso})</td>
              <td style={{ padding: '10px' }}>{d.importador?.nombre_razon_social}</td>
              <td style={{ padding: '10px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: d.estado === 'Liberada' ? '#dcfce7' : '#fee2e2',
                  color: d.estado === 'Liberada' ? '#166534' : '#991b1b'
                }}>
                  {d.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}