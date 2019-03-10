/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:23:49
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-09 22:07:46
 */

import fetch from '@/utils/fetch'

export const loginApi = {
  /* 登录获取sessionId */
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
  logout (params = {}) {
    return fetch({
      url: '/user/logout',
      method: 'post',
      params
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
