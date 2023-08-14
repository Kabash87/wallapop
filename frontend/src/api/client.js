import axios from "axios";

/**
 * creacion del cliente de axios para llamar al backend
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

//interceptor para que solo recoja el campo .data de la respuesta
client.interceptors.response.use((response) => response.data.results);

export default client;
