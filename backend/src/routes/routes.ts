import express, { Request, Response } from 'express';

const router = express.Router();


// Almacenar temporalmente las propinas y pagos
const tips: number[] = [];
const payments: { employees: string[]; amount: number }[] = [];



router.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Ruta funcionando correctamente' });
});

// Ruta para registrar propinas
router.post('/tips', (req: Request, res: Response) => {
  const { amount } = req.body;
  tips.push(amount);
  res.json({ message: 'Propina registrada' });
});


// Ruta para realizar el pago de propinas
router.post('/payments', (req: Request, res: Response) => {
  const { employees, amount } = req.body;

  const tipPerEmployee = amount / employees.length; // Dividir propinas entre empleados

  payments.push({ employees, amount }); // Guardar la transacción en memoria

  res.json({ message: 'Pago registrado' });
});

// Ruta para ver las propinas registradas
router.get('/tips', (req: Request, res: Response) => {
  res.json({ tips });
});

// Ruta para ver los pagos realizados
router.get('/payments', (req: Request, res: Response) => {
  res.json({ payments });
});

export { router };
