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
  const pattern = /^ *$/
  const check = pattern.exec(userName);
  if (check !== null) {
    return `Không được bỏ trống.`;
  }

  return "";
}

const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return `Xác nhận mật khẩu không khớp với mật khẩu hiện tại`;
  }

  return "";
}

const validatePhoneNumber = (phone) => {
  const pattern = /^[0-9]{10}$/g
  const check = pattern.exec(phone)
  if (check !== null) {
    return "";
  }
  return `Quý khách vui lòng nhập số điện thoại gồm 10 chữ số.`;
}

const validateDate = (date) => {
  debugger;
  const pattern = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/
  const check = pattern.exec(date);
  if (check != null) {
    return "";
  }
  return "Nhập ngày với định dạng yyyy-mm-dd";
}

const validateString = (str) => {
  const pattern = /^[^`~#$%^&={}\[\]|\\<>๐฿]*$/g
  const check = pattern.exec(str)
  if (check !== null) {
    return "";
  }
  return `Vui lòng không nhập các ký tự đặc biệt`;
}

export { validatePassword, validateEmail, validateUserName, validateConfirmPassword, validatePhoneNumber, validateDate, validateString };