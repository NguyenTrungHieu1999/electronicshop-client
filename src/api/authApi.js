import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

export const Login = async ({ email, password, rememberMe }) => {
  const data = { email, password, rememberMe };

  try {
    let res = await axios.post(`${apiURL}/api/auth`, data);

    return res.data;

  } catch (error) {
    console.log(error);
  }
}

export const Register = async ({ userName, password, confirmPassword, email, gender }) => {
  const data = { userName, password, confirmPassword, email, gender };

  try {
    let res = await axios.post(`${apiURL}/api/users/create`, data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}