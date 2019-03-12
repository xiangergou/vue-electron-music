/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:23:49
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-11 14:23:01
 */

import fetch from '@/utils/fetch'

export const loginApi = {
  login (params = {}) {
    return fetch({
      url: '/login/cellphone',
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
  logout () {
    return fetch({
      url: '/logout',
      method: 'post'
    })
  }

}
