import api from "./api_json";

const login = data => api.post(`${api.url.authLink}`, data);
const externalLogins = data => api.post(`${api.url.authLink}/external-logins`, data);

export default {
  login, externalLogins
};