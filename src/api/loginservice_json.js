import api from "./api_json";

const login = data => api.post(`${api.url.authLink}`, data);

export default {
  login
};