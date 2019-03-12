/*
 * @Author: liuxia
 * @Date: 2019-03-05 14:43:08
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-12 15:28:51
 */

import { homeApi } from '@/api/dashboard'
import { getSessionId } from '@/utils/auth'

const state = {
  bannerImgList: JSON.parse(window.sessionStorage.getItem('banner')) || [],
  newCourier: JSON.parse(window.sessionStorage.getItem('newCourier')) || [],
  userPlayList: JSON.parse(window.sessionStorage.getItem('userPlayList')) || [],
  userResource: JSON.parse(window.sessionStorage.getItem('userResource')) || [],
  personalized: JSON.parse(window.sessionStorage.getItem('personalized')) || []
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
        const data = response.data.data
        window.sessionStorage.setItem('newCourier', JSON.stringify(data))
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
        window.sessionStorage.setItem('personalized', JSON.stringify(data))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * @returns 获取获取每日推荐歌单
   */
  getResource ({ commit, state }) {
    return new Promise((resolve, reject) => {
      homeApi.getResource().then(response => {
        const data = response.data
        window.sessionStorage.setItem('userResource', JSON.stringify(data))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   *
   * @param {*} { commit, state }
   * @returns 获取用户歌单
   */
  getUserPlaylist ({ commit, state }) {
    return new Promise((resolve, reject) => {
      homeApi.getUserPlaylist({
        uid: getSessionId()
      }).then(res => {
        window.sessionStorage.setItem('userPlayList', JSON.stringify(res))
        resolve(res)
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
