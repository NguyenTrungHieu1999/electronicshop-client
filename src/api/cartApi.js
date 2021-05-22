import api from "./api_json";

const createCarts = data => api.post(`${api.url.cartlink}/create`, data);
const getAllCarts = () => api.get(`${api.url.cartlink}/getAll`);

export default {
  createCarts, getAllCarts
}