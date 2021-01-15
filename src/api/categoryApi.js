import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

const getAllCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/categories`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getAllProductType = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/categories/productType`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getCategoryById = async (id) => {
  try {
    let res = await axios.get(`${apiURL}/api/categories/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export { getAllCategory, getAllProductType, getCategoryById };