import Cookies from 'js-cookie'

// 认证信息包括 token && serverKey，需要在发请求时带在 header 上
const TOKEN_KEY = 'ADMIN_TOKEN'
const SERVER_KEY = 'SERVER_KEY'
// 登录后的用户信息
const USER_KEY = 'USER_KEY'

export function getTokens () {
  return {
    token: Cookies.get(TOKEN_KEY),
    serverKey: Cookies.get(SERVER_KEY)
  }
}

export function setTokens (data) {
  return Cookies.set(TOKEN_KEY, data.token) && Cookies.set(SERVER_KEY, data.serverKey)
}

export function removeTokens () {
  return Cookies.remove(TOKEN_KEY) && Cookies.remove(SERVER_KEY)
}

export function setUser (user) {
  return Cookies.set(USER_KEY, user)
}

export function getUser () {
  return Cookies.getJSON(USER_KEY)
}

export function removeUser () {
  return Cookies.remove(USER_KEY)
}

export function getUsername () {
  return getUser().username
}

export function loggedIn () {
  return !!Cookies.get(TOKEN_KEY)
}

export default {
  getTokens,
  setTokens,
  removeTokens,
  setUser,
  getUser,
  removeUser,
  getUsername,
  loggedIn
}
