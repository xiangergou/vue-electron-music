/*
 * @Author: liuxia
 * @Date: 2019-03-13 21:44:32
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-13 21:49:01
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
  }

}
