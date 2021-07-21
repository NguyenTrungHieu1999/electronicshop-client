import axios from "axios";
import Cookies from "js-cookie";

const apiURL = process.env.REACT_APP_API_URL
const headers = {
  'Accept': 'application/json; charset=utf-8',
  'Content-Type': 'application/json;charset=UTF-8',
  'Authorization': `Bearer ${Cookies.get('token')}`
}


const totalRate = async (productId) => {
  try {
    const res = await axios.get(`${apiURL}/api/reviews/total-rate/${productId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getReviewByProductId = async (productId) => {
  try {
    const res = await axios.get(`${apiURL}/api/reviews/${productId}/get-all`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const editReviewById = async (data) => {
  try {
    const res = await axios.put(`${apiURL}/api/reviews/edit`, data, {headers})
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export { totalRate, getReviewByProductId, editReviewById };