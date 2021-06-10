import api from "./api_json";

const checkout = data => api.post(`${api.url.orderlink}/create`, data);
const getOrderByUserId = () => api.get(`${api.url.orderlink}/my-order`);
const haveOrder = data => api.get(`${api.url.orderlink}/haveOrder/${data}`,);

export default {
  checkout, getOrderByUserId, haveOrder
};