import api from "./axios";

// Guardar la propina
export const saveTip = async (amount: number) => {
  return api.post("/tips", { amount });
};

// Guardar la cantidad de personas
export const savePersons = async (persons: number, amount: number) => {
  return api.post("/persons", { persons, amount });
};

