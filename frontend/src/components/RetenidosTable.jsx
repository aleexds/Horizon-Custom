// frontend/src/components/RetenidosTable.jsx
export default function RetenidosTable({ retenidos }) {
  if (!retenidos || retenidos.length === 0) {
    return <p style={{ color: '#64748b' }}>No hay mercancía retenida en este momento.</p>;
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>ID Stock</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Producto</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Cantidad</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Bodega / Ubicación</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Fecha Ingreso</th>
            <th style={{ padding: '12px', border: '1px solid #334155' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {retenidos.map((r) => (
            <tr key={r.id_inventario} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>#{r.id_inventario}</td>
              <td style={{ padding: '10px' }}>{r.producto?.descripcion}</td>
              <td style={{ padding: '10px' }}>{r.cantidad}</td>
              <td style={{ padding: '10px' }}>{r.bodega?.nombre} ({r.bodega?.ubicacion})</td>
              <td style={{ padding: '10px' }}>{r.fecha_ingreso}</td>
              <td style={{ padding: '10px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: '#fee2e2',
                  color: '#991b1b'
                }}>
                  {r.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}