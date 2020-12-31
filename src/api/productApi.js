import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

export const getAllProduct = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/products`)
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getProductById = async (productId) => {
  try {
    let res = await axios.get(`${apiURL}/api/products/${productId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}