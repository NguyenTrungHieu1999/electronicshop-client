import api from "./api_json";

const getAllOrders = () => api.get(`${api.url.orderlink}/my-order`);
const cancleMyOrder = data => api.post(`${api.url.orderlink}/cancle-my-order/id=${data}`);
const confirmReceived = data => api.put(`${api.url.orderlink}/has-Received/${data}`);

export default {
  getAllOrders, cancleMyOrder, confirmReceived
}