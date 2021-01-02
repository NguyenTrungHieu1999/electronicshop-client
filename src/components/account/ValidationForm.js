const validatePassword = (password) => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/g
  const check = pattern.exec(password);

  if (check !== null) {
    return "";
  }

  return `Mật khẩu cần phải có 8 đến 30 ký tự, gồm ít nhất 1 ký tự số, 1 ký tự thường, 1 ký tự hoa, 1 ký tự đặc biệt`;
}

const validateEmail = (email) => {
  const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const check = pattern.exec(email);

  if (check !== null) {
    return "";
  }

  return `Nhập đúng định dạng Email (ví dụ : abc@gmail.com)`;
}

const validateUserName = (userName) => {
  if (userName === "") {
    return `Bạn cần nhập thông tin người dùng`;
  }

  return "";
}

const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return `Xác nhận mật khẩu không khớp với mật khẩu hiện tại`;
  }

  return "";
}

export { validatePassword, validateEmail, validateUserName, validateConfirmPassword };