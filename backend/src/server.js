// backend/src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import declaracionRoutes from './routes/declaracionRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', declaracionRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('API Horizon Aduanas funcionando correctamente');
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servidor Horizon Aduanas activo en http://localhost:${PORT}`);
});