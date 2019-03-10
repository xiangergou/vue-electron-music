/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:26:19
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-10 22:54:10
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
  },

  /* 获取热门精选 */
  getPlayList () {
    return fetch({
      url: '/personalized',
      method: 'post'
    })
  },

  /* 获取热门精选 */
  getResource () {
    return fetch({
      url: '/recommend/resource',
      method: 'post'
    })
  }

}
