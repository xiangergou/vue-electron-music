/*
 * @Author: liuxia
 * @Date: 2019-03-13 20:54:56
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-13 22:07:14
 */
import { playListApi } from '@/api/playList'

const playList = {
  // namespaced: true,
  state: {
    currentSong: {}
  },
  getters: {
    palyList: state => state.playlist,
    currentIndex: state => state.currentIndex,
    currentSong: state => state.currentSong
  },
  mutations: {
    SET_CURRENTSONG: (state, curSong) => {
      state.currentSong = curSong
    }
  },
  actions: {
    setCrtSong ({ commit }, curSong) {
      commit('SET_CURRENTSONG', curSong)
    },

    getSongUrl ({ commit }, id) {
      return new Promise((resolve, reject) => {
        playListApi.getSongUrl(id).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default playList
