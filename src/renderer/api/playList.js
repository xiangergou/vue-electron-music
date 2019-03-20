/*
 * @Author: liuxia
 * @Date: 2019-03-13 21:44:32
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-19 21:16:03
 */

import fetch from '@/utils/fetch'

export const playListApi = {
  // 获取音乐 url
  getSongUrl (params) {
    return fetch({
      url: '/song/url',
      method: 'post',
      params
    })
  },

  // 搜索建议
  querySong (params) {
    return fetch({
      url: '/search/suggest',
      method: 'post',
      params
    })
  }
}
