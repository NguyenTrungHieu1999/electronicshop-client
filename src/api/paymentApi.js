import api from "./api_json";

const checkout = data => api.post(`${api.url.orderlink}/create`, data);

export default {
  checkout
};