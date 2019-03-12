/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:26:19
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-11 14:22:51
 */

//  首页api
import fetch from '@/utils/fetch'

export const homeApi = {
  /* 获取banner */
  getBanner () {
    return fetch({
      url: '/banner',
      method: 'post'
    })
  },

  /* 新歌速递 */
  getNewCourier (params) {
    return fetch({
      url: '/top/song',
      method: 'post',
      params
    })
  },

  /* 获取推荐歌单 */
  getPlayList () {
    return fetch({
      url: '/personalized',
      method: 'post'
    })
  },

  /* 获取获取每日推荐歌单 */
  getResource () {
    return fetch({
      url: '/recommend/resource',
      method: 'post'
    })
  },

  /* 获取用户歌单 */
  getUserPlaylist (params = {}) {
    return fetch({
      url: '/user/playlist',
      method: 'post',
      params
    })
  }
}
