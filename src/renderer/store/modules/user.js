/*
 * @Author: liuxia
 * @Date: 2019-01-12 19:09:26
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-17 18:57:51
 */

import { loginApi } from '@/api/user'
import { getSessionId, setSessionId, removeSessionId } from '@/utils/auth'
import defaultAvatar from '@/assets/defaultAvatar.png'

const user = {
  state: {
    sessionId: getSessionId(),
    name: '',
    avatar: '',
    userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')) || {}
  },
  getters: {
    userInfo: state => state.userInfo
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
    // SET_USERINFO: (state, data) => {
    //   state.userInfo = data
    // }
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
          // commit('SET_USERINFO', data)
          window.sessionStorage.setItem('userInfo', JSON.stringify(data))
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
          commit('SET_AVATAR', data.picUrl || defaultAvatar)
          commit('SET_USERINFO', data)
          resolve(response)
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
