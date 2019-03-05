/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:26:19
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-05 19:10:59
 */

import fetch from '@/utils/fetch'

export const homeApi = {
  /* 获取banner */
  getBanner () {
    return fetch({
      url: '/banner',
      method: 'post'
    })
  },

  /* 获取banner */
  getNewCourier (params) {
    return fetch({
      url: '/top/song',
      method: 'post',
      params
    })
  }
}
