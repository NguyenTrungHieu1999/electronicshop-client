import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();
const tokenFromCookies = cookies.get('token');

let token = '';

if (tokenFromCookies !== null && tokenFromCookies !== undefined) {
  token = jwt_decode(cookies.get('token').resultObj);
}

let emailDecode = '';
let userIdDecode = '';
let roleDecode = '';
let nameDecode = '';

Object.keys(token).forEach(function (key) {
  let res = key.split("/");
  if (res.length > 1) {
    if (res[res.length - 1] === 'emailaddress') {
      emailDecode = token[key];
    }
    if (res[res.length - 1] === 'nameidentifier') {
      userIdDecode = token[key];
    }
    if (res[res.length - 1] === 'role') {
      roleDecode = token[key];
    }
    if (res[res.length - 1] === 'name') {
      nameDecode = token[key];
    }
  }
});

export { emailDecode, userIdDecode, roleDecode, nameDecode };