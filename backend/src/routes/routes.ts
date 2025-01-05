import express, { Request, Response } from "express";

const router = express.Router();

// Almacenar temporalmente las propinas y pagos
interface Tip {
  amount: number;
  persons: number;
  payments: Payment[]; // Cambié el tipo a Payment[] para que coincida con la interfaz
  paid: boolean;
}

interface Payment {
  payMethod: string;
  amount: number;
}

const tips: Tip[] = [];

router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Ruta funcionando correctamente" });
});

// Ruta para registrar propinas
router.post("/tips", (req: Request, res: Response) => {
  const { amount } = req.body;
  
  // Asegurarse de que cada propina tenga un array de pagos vacío al principio
  const newTip: Tip = {
    amount: amount,
    persons: 0, // Deberías permitir que el cliente envíe esta información si es necesario
    payments: [],
    paid: false
  };
  
  tips.push(newTip);
  res.json({ message: "Propina registrada" });
});

// Ruta para realizar el pago de propinas
router.post("/payments", (req: Request, res: Response) => {
  console.log("Body recibido:", req.body); // Verifica que los datos se reciban correctamente

  const { payments, amount } = req.body;
  
  // Buscar la propina con el monto especificado
  const tip = tips.find((tip) => tip.amount === amount);

  // Añadir los pagos a la propina
  payments.forEach((payment: Payment) => {
    const { payMethod, amount } = payment;
    
    // Validación de monto
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Cantidad de pago no válida" });
    }

    // Asegurarse de que la propina tenga la propiedad 'payments' correctamente definida
    tip.payments.push({ payMethod, amount });
  });

  res.json({ message: "Pago registrado correctamente" });
});

// Ruta para marcar una propina como pagada
router.post("/payments/complete", (req: Request, res: Response) => {
  const { amount } = req.body;

  // Buscar el tip que coincida con el monto
  const tip = tips.find((tip) => tip.amount === amount);

  // Marcar los pagos como completos
  tip.paid = true;

  res.json({ message: "Pago marcado como completo", payments: tip.payments });
});


// Ruta para ver las propinas registradas
router.get("/tips", (req: Request, res: Response) => {
  res.json({
    message: "Lista de propinas",
    data: tips,
  });
});

// Ruta para ver los pagos realizados
router.get("/payments", (req: Request, res: Response) => {
  const allPayments = tips.flatMap((tip) => tip.payments);
  res.json({ payments: allPayments });
});

// Ruta para borrar las propinas
router.delete("/tips", (req: Request, res: Response) => {
  tips.splice(0, tips.length);
  res.json({ message: "Propinas borradas" });
});

//ruta para guardad la cantidad de personas
router.post("/persons", (req: Request, res: Response) => {
  const { persons, amount } = req.body;

  // Buscar el tip que coincida con el monto
  const tip = tips.find((tip) => tip.amount === amount);

  tip.persons = persons;

  res.json({ message: "Cantidad de personas registradas" });
});

export { router };
