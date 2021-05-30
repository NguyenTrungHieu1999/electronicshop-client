import api from "./api_json";

const createCarts = data => api.post(`${api.url.cartlink}/create`, data);
const getAllCarts = () => api.get(`${api.url.cartlink}/getAll`);
const addCarts = data => api.post(`${api.url.cartlink}/add`, data)
const updateCarts = data => api.put(`${api.url.cartlink}/update`, data);
const cleanCarts = () => api.put(`${api.url.cartlink}/remove`);

export default {
  createCarts, getAllCarts, addCarts, updateCarts, cleanCarts
}