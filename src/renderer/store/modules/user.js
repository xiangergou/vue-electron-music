/*
 * @Author: liuxia
 * @Date: 2019-01-12 19:09:26
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-09 22:35:39
 */

import { loginApi } from '@/api/user'
// import { getSessionId, setSessionId, removeSessionId } from '@/utils/auth'
// import defaultAvatar from '@/assets/defaultAvatar.png'

const user = {
  state: {
    // sessionId: getSessionId(),
    name: '',
    avatar: '',
    roles: []
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
    },
    SET_ROLES: (state, roles) => {
      const rolesMap = {
        '1': 'admin',
        '99': 'service',
        '0': 'global'
      }
      state.roles = rolesMap[roles.toString()] || 'global'
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        loginApi.login({
          phone: mobile,
          password: userInfo.password,
          xhrFields: { withCredentials: true }
        }).then(response => {
          const data = response.data.data
          // setSessionId(data.sessionId)
          // commit('SET_SESSIONID', data.sessionId)
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

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.logout({
          sessionId: state.sessionId
        }).then(() => {
          // removeSessionId()
          commit('SET_SESSIONID', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    getUserSongList ({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.getUserSongList({
          xhrFields: { withCredentials: true }
          // sessionId: state.sessionId
        }).then(res => {
          // removeSessionId()
          commit('SET_SESSIONID', '')
          commit('SET_ROLES', [])
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
