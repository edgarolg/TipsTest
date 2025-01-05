import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // URL del backend
});


//guardar las tiPs que se crean
interface Tip {
  // Define the properties of Tip here
  title: string;
  description: string;
}

export const createTip = async (tip: Tip) => {
  try {
    const response = await api.post("/tips", tip);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default api;
