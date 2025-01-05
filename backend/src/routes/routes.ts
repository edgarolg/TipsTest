import express, { Request, Response } from 'express';

const router = express.Router();


// Almacenar temporalmente las propinas y pagos

interface Tip {
  amount: number;
  persons: number;
  payments: { payMethod: string[]; amount: number }[]; 
  paid: boolean;
}

const tips: Tip[] = [];

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
  const { method, amount } = req.body;

  const tipPerEmployee = amount / method.length; // Dividir propinas entre empleados

  const tip = tips.find(tip => !tip.paid);
  if (tip) {
    tip.payments.push({ payMethod: method, amount });
    tip.paid = true;
  }

  res.json({ message: 'Pago registrado' });
});

// Ruta para ver las propinas registradas
router.get('/tips', (req: Request, res: Response) => {
  res.json({ tips });
});

// Ruta para ver los pagos realizados
router.get('/payments', (req: Request, res: Response) => {
  const allPayments = tips.flatMap(tip => tip.payments);
  res.json({ payments: allPayments });
});


//Ruta para borrar las propinas
router.delete('/tips', (req: Request, res: Response) => {
  tips.splice(0, tips.length);
  res.json({ message: 'Propinas borradas' });
});


//ruta para guardad la cantidad de personas
router.post('/persons', (req: Request, res: Response) => {
  const { persons } = req.body;
  tips.push(persons);
  res.json({ message: 'Cantidad de personas registradas' });
});

export { router };
