import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

const getAllRole = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/users/roles`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export { getAllRole };