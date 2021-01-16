import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL


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


export { totalRate, getReviewByProductId };