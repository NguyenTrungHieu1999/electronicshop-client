import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

const Register = async ({ userName, password, confirmPassword, email, gender }) => {
  const data = { userName, password, confirmPassword, email, gender };

  try {
    let res = await axios.post(`${apiURL}/api/users/create`, data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const forgotPassWord = async (email) => {
  const data = { email };
  try {
    let res = await axios.post(`${apiURL}/api/auth/forgot-password`, data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const resetPassword = async ({ token, email, password, confirmPassword }) => {
  const data = { token, email, password, confirmPassword };
  try {
    let res = await axios.post(`${apiURL}/api/auth/reset-password`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const signOut = async () => {
  try {
    let res = await axios.post(`${apiURL}/api/auth/sign-out`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export { Register, forgotPassWord, resetPassword, signOut };