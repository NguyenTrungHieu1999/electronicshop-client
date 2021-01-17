import api from './api_json';

const search = data => api.get(`${api.url.productlink}/search?${data}`);

export default { search };