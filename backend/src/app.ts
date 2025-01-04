import express from 'express';
import { router } from './routes/routes';  // Importa el router desde routes.ts

const app = express();
const port = 3000;

app.use(express.json()); // Usa el middleware nativo de express para manejar JSON
app.use('/api', router);  // Usa el router para las rutas que comienzan con '/api'

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

