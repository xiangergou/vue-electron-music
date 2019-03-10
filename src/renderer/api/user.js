/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:23:49
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-10 10:51:48
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
  },
  /* 获取用户信息 , 歌单，收藏，mv, dj 数量 */
  getUserSongList (params = {}) {
    return fetch({
      url: '/user/subcount',
      method: 'post',
      params
    })
  }
}
