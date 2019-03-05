/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:23:49
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-04 21:23:49
 */

import fetch from '@/utils/fetch'

export const loginApi = {
  /* 登录获取sessionId */
  login (params = {}) {
    return fetch({
      url: '/user/login',
      method: 'post',
      params
    })
  },

  getInfo (params = {}) {
    return fetch({
      url: '/user/getInfo',
      method: 'post',
      params
    })
  },
  /* 退出系统 */
  logout (params = {}) {
    return fetch({
      url: '/user/logout',
      method: 'post',
      params
    })
  }
}
