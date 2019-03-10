/*
 * @Author: liuxia
 * @Date: 2019-03-05 14:43:08
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-10 22:54:41
 */

import { homeApi } from '@/api/dashboard'

const state = {
  bannerImgList: JSON.parse(window.sessionStorage.getItem('banner')) || [],
  newCourier: []
}

const mutations = {
  SET_BANNER_SESSION: () => {
  }
}

const actions = {
  // 获取banner
  getBanner ({ commit, state }) {
    return new Promise((resolve, reject) => {
      homeApi.getBanner({
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
  },

  /**
   * @param {*} { commit, state }
   * @returns 新歌速递
   */
  getNewCourier ({ commit, state }, type) {
    return new Promise((resolve, reject) => {
      homeApi.getNewCourier(type).then(response => {
        const data = response.data
        window.sessionStorage.setItem('newCourier', JSON.stringify(data))
        // commit('SET_ROLES', data.isAdmin)
        // commit('SET_NAME', data.name)
        // commit('SET_AVATAR', data.picUrl || defaultAvatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * @param {*} { commit, state }
   * @returns 推荐歌单
   */
  getPlayList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      homeApi.getPlayList().then(response => {
        const data = response.data
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getResource ({ commit, state }) {
    return new Promise((resolve, reject) => {
      homeApi.getResource().then(response => {
        const data = response.data
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
