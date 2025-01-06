import express, { Request, Response } from "express";

const router = express.Router();

// Almacenar temporalmente las propinas y pagos
interface Tip {
  amount: number;
  persons: number;
  payments: Payment[];
  paid: boolean;
}

interface Payment {
  payMethod: string;
  amount: number;
}

const tips: Tip[] = [];

//METODOS GET


//Ruta de prueba
router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Ruta funcionando correctamente" });
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


//METODOS POST

// Ruta para registrar propinas
router.post("/tips", (req: Request, res: Response) => {
  const { amount } = req.body;
  
  //Darle a cada propina un formato específico
  const newTip: Tip = {
    amount: amount,
    persons: 0, 
    payments: [],
    paid: false
  };

  tips.push(newTip);
  res.json({ message: "Propina registrada" });
});

// Ruta para realizar el pago de propinas
router.post("/payments", (req: Request, res: Response) => {
  console.log("Body recibido:", req.body); 

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

//Ruta para guardad la cantidad de personas
router.post("/persons", (req: Request, res: Response) => {
  const { persons, amount } = req.body;

  // Buscar el tip que coincida con el monto
  const tip = tips.find((tip) => tip.amount === amount);

  tip.persons = persons;

  res.json({ message: "Cantidad de personas registradas" });
});


//METODOS DELETE

// Ruta para borrar las propinas
router.delete("/tips", (req: Request, res: Response) => {
  tips.splice(0, tips.length);
  res.json({ message: "Propinas borradas" });
});


export { router };
