import api from "./api_json";

const myProfile = () => api.get(`${api.url.userlink}/me`);

const updateProfile = data => api.put(`${api.url.userlink}/update/me`, data);

export default {
  myProfile,
  updateProfile
}