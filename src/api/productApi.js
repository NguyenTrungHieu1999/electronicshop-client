import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

const getAllProduct = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/products/get-all/client`)
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getProductById = async (productId) => {
  try {
    let res = await axios.get(`${apiURL}/api/Products/${productId}/client`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getProductByCateId = async (cateId) => {
  try {
    let res = await axios.get(`${apiURL}/api/products/cateId=${cateId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const searchProduct = async (keyword) => {
  try {
    let res = await axios.get(`${apiURL}/api/products/search?KeyWord=${keyword}`)
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const filterProduct = async (sorted, price) => {
  try {
    let res = await axios.get(`${apiURL}/api/Products/filter?Sorted=${sorted}&Price=${price}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getNewProducts = async () => {
  let res = await axios.get(`${apiURL}/api/products/get-new-products`)
  return res.data;
}

export { getAllProduct, getProductById, getProductByCateId, searchProduct, getNewProducts, filterProduct };