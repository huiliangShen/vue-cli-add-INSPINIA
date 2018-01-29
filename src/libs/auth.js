import Cookies from 'js-cookie'

const TokenKey = 'JETC';

export function getToken() {
  return Cookies.get(TokenKey);
}
/*
 will be a session cookies
 这是一个过期时间为session的cookies
* */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
