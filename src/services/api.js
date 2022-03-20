import axios from "axios";

const api = axios.create({
  baseURL: "https://frontendapi.cm2tech.com.br"
});

export default api;