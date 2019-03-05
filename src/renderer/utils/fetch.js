/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:20:31
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-05 19:11:26
 */

import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store';
// import store from '../store'
// import { getToken } from '@/utils/auth'

/* 默认请求参数 */
// const defaultConfig = {
//   timestamp: new Date().getTime()
// }

/* 创建axios实例 */
const service = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: 'http://localhost:3000/',
  timeout: 5000 // 请求超时时间
  // interceptors: true, // 是否开启response拦截器 默认true
  // noAssign: false // 请求体是否带defaultConfig 默认false
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  // if (config.params) {
  //   config.params = Object.assign(config.params, defaultConfig)
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

/* respone拦截器 */
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.message === '取消重复请求') {
      return Promise.reject(error)
    }
    Message({
      message: '连接服务器失败',
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
