// backend/src/server.js
import express from 'express';
import cors from 'cors';
import declaracionRoutes from './routes/declaracionRoutes.js';
import inspeccionRoutes from './routes/inspeccionRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', declaracionRoutes);
app.use('/api', inspeccionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor aduanero corriendo en http://localhost:${PORT}`);
});