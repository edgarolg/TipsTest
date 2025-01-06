import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Servicio para manejar propinas
export const tipsService = {
  // Guardar los pagos realizados
  savePayment(payments: { payMethod: string; amount: number }[], totalAmount: number) {
    return axios.post(`${API_BASE_URL}/payments`, {
      payments,
      amount: totalAmount,
    });
  },

  // Completar el proceso de propinas
  completeTips(amount: number) {
    return axios.post(`${API_BASE_URL}/payments/complete`, { amount });
  },
};
