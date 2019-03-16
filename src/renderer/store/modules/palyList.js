/*
 * @Author: liuxia
 * @Date: 2019-03-13 20:54:56
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-16 22:17:05
 */
import { playListApi } from '@/api/playList'

const playList = {
  // namespaced: true,
  state: {
    currentSong: {},
    currentSongInfo: {},
    currentIndex: 0,
    mode: 0
  },
  getters: {
    palyList: state => state.playlist,
    currentIndex: state => state.currentIndex,
    currentSong: state => state.currentSong,
    currentSongInfo: state => state.currentSongInfo,
    mode: state => state.mode
  },
  mutations: {
    SET_CURRENTSONG: (state, curSong) => {
      state.currentSong = curSong
    },
    CURRENTSONG_INFO: (state, curSongInfo) => {
      state.currentSongInfo = curSongInfo
    },
    SET_MODE: (state, mode) => {
      state.mode = mode
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
          commit('CURRENTSONG_INFO', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default playList
