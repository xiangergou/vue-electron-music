/*
 * @Author: liuxia
 * @Date: 2019-01-12 19:09:26
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-10 11:34:06
 */

import { loginApi } from '@/api/user'
import { getSessionId, setSessionId, removeSessionId } from '@/utils/auth'
// import defaultAvatar from '@/assets/defaultAvatar.png'

const user = {
  state: {
    sessionId: getSessionId(),
    name: '',
    avatar: ''
  },
  mutations: {
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        loginApi.login({
          phone: mobile,
          password: userInfo.password
        }).then(response => {
          const data = response.data
          setSessionId(data.account.id)
          commit('SET_SESSIONID', data.account.id)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    getUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.getInfo({
          sessionId: state.sessionId
        }).then(response => {
          const data = response.data.data
          commit('SET_ROLES', data.isAdmin)
          commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.picUrl || defaultAvatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getUserSongList ({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.getUserSongList({
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LogOut () {
      return new Promise((resolve, reject) => {
        loginApi.logout({
        }).then(res => {
          removeSessionId()
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
