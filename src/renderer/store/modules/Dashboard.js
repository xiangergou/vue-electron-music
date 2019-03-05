/*
 * @Author: liuxia
 * @Date: 2019-03-05 14:43:08
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-05 18:29:11
 */

import { homeApi } from '@/api/dashboard'

const state = {
  bannerImgList: JSON.parse(window.sessionStorage.getItem('banner')) || []
}

const mutations = {
  SET_BANNER_SESSION: () => {
  }
}

const actions = {
  // 获取用户信息
  getBanner ({ commit, state }) {
    return new Promise((resolve, reject) => {
      homeApi.getBanner({
        // sessionId: state.sessionId
      }).then(response => {
        const data = response.data
        window.sessionStorage.setItem('banner', JSON.stringify(data.banners))
        // commit('SET_ROLES', data.isAdmin)
        // commit('SET_NAME', data.name)
        // commit('SET_AVATAR', data.picUrl || defaultAvatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
