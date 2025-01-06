import api from "./axios";

// Guardar una propina
export const saveTip = async (amount: number) => {
  try {
    const response = await api.post("/tips", { amount });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    console.error("Error al guardar la propina:", errorMessage);
    throw error;
  }
};

// Guardar la cantidad de personas para una propina específica
export const savePersons = async (persons: number, amount: number) => {
  try {
    const response = await api.post("/persons", { persons, amount });
    return response.data;
  } catch (error: any) {
    console.error("Error al guardar la cantidad de personas:", error.response?.data || error.message);
    throw error;
  }
};

// Registrar pagos para una propina
export const savePayments = async (payments: any[], amount: number) => {
  try {
    const response = await api.post("/payments", { payments, amount });
    return response.data;
  } catch (error: any) {
    console.error("Error al registrar los pagos:", error.response?.data || error.message);
    throw error;
  }
};

// Marcar como pagada una propina
export const completePayment = async (amount:number) => {
  try {
    const response = await api.post("/payments/complete", { amount });
    return response.data;
  } catch (error: any) {
    console.error("Error al marcar el pago como completo:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener todas las propinas
export const getTips = async () => {
  try {
    const response = await api.get("/tips");
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener las propinas:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener todos los pagos realizados
export const getPayments = async () => {
  try {
    const response = await api.get("/payments");
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener los pagos:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar todas las propinas
export const deleteTips = async () => {
  try {
    const response = await api.delete("/tips");
    return response.data;
  } catch (error: any) {
    console.error("Error al eliminar las propinas:", error.response?.data || error.message);
    throw error;
  }
};
