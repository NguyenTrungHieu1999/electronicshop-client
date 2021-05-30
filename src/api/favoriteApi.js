import api from "./api_json";

const addRemoveFavorites = data => api.post(`${api.url.favoritelink}/add-remove`, data);
const getAllFavorites = () => api.get(`${api.url.favoritelink}/getAll`);
const cleanFavorites = () => api.put(`${api.url.favoritelink}/clean`);

export default{
  addRemoveFavorites, getAllFavorites, cleanFavorites
}