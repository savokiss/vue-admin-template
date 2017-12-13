import axios from 'axios'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import { getTokens } from './auth/utils'
import router from '@/router'
import config from '@/config'

// 创建axios实例
const api = axios.create({
  baseURL: config.API_URL, // 后台 api 的 url
  timeout: 30000     // 请求超时时间
})

// request拦截器
api.interceptors.request.use(config => {
  config.headers['token'] = getTokens().token
  NProgress.start()
  return config
}, error => {
  // Do something with request error
  console.log('request err:', error) // for debug
  Promise.reject(error)
  NProgress.done()
})

// respone拦截器
api.interceptors.response.use(res => {
  NProgress.done()
  if (res.data.code === 102) {
    Message.error('token过期,请重新登录')
    router.push('/auth')
  }
  return res
}, error => {
  NProgress.done()
  Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error)
})

export default api
