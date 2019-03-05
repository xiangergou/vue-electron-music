/*
 * @Author: liuxia
 * @Date: 2019-03-04 21:26:19
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-04 21:27:19
 */

import fetch from '@/utils/fetch'


export const dashboard = {
  /* 热门推荐 */
  getHot(params = {}) {
    return fetch({
      url: '/user/login',
      method: 'post',
      params
    })
  }
}
