import api from './api_json';

const createReview = (data) => api.post(`${api.url.reviewLink}/create`, data);

export default {
  createReview
};