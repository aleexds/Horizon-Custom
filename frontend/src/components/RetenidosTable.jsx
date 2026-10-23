// frontend/src/components/RetenidosTable.jsx
export default function RetenidosTable({ retenidos, onCambiarEstado }) {
  if (!retenidos || retenidos.length === 0) {
    return <p style={{ color: '#64748b' }}>No hay mercancía en registro de inventario.</p>;
  }

  const getBadgeStyle = (estado) => {
    const isRetenido = estado === 'Retenido';
    return {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: 600,
      backgroundColor: isRetenido ? '#fee2e2' : '#dcfce7',
      color: isRetenido ? '#991b1b' : '#166534',
      border: `1px solid ${isRetenido ? '#fecaca' : '#bbf7d0'}`
    };
  };

  return (
    <div style={{ overflowX: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
          <tr>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Producto</th>
            <th style={{ padding: '12px' }}>Cantidad</th>
            <th style={{ padding: '12px' }}>Valor Unitario</th>
            <th style={{ padding: '12px' }}>Bodega / Ubicación</th>
            <th style={{ padding: '12px' }}>Fecha Ingreso</th>
            <th style={{ padding: '12px' }}>Estado</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {retenidos.map((item) => {
            const isRetenido = item.estado === 'Retenido';
            const nuevoEstado = isRetenido ? 'Liberado' : 'Retenido';

            return (
              <tr key={item.id_inventario} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>#{item.id_inventario}</td>
                <td style={{ padding: '12px', fontWeight: 600, color: '#0369a1' }}>
                  {item.producto?.descripcion || 'Sin descripción'}
                </td>
                <td style={{ padding: '12px' }}>{item.cantidad}</td>
                <td style={{ padding: '12px' }}>
                  ${item.producto?.valor_unitario ? item.producto.valor_unitario.toFixed(2) : '0.00'}
                </td>
                <td style={{ padding: '12px' }}>
                  {item.bodega ? `${item.bodega.nombre} (${item.bodega.ubicacion})` : 'N/A'}
                </td>
                <td style={{ padding: '12px' }}>{item.fecha_ingreso}</td>
                <td style={{ padding: '12px' }}>
                  <span style={getBadgeStyle(item.estado)}>{item.estado}</span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onCambiarEstado) {
                        onCambiarEstado(item.id_inventario, nuevoEstado);
                      }
                    }}
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: isRetenido ? '#16a34a' : '#ea580c',
                      color: 'white'
                    }}
                  >
                    {isRetenido ? 'Liberar Lote' : 'Retener Lote'}
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