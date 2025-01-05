import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './routes/routes';

const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas
app.use('/api', router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
