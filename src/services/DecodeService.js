import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const tokenFromCookies = Cookies.get('token');
const cookiesAuth = Cookies.get('isAuth');

let token = '';

if (tokenFromCookies) {
  token = jwt_decode(Cookies.get('token'));
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

export { emailDecode, userIdDecode, roleDecode, nameDecode, cookiesAuth };