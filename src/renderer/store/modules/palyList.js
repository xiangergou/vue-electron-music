/*
 * @Author: liuxia
 * @Date: 2019-03-13 20:54:56
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-16 14:34:13
 */
import { playListApi } from '@/api/playList'

const playList = {
  // namespaced: true,
  state: {
    currentSong: {},
    currentSongInfo: {}
  },
  getters: {
    palyList: state => state.playlist,
    currentIndex: state => state.currentIndex,
    currentSong: state => state.currentSong,
    currentSongInfo: state => state.currentSongInfo
  },
  mutations: {
    SET_CURRENTSONG: (state, curSong) => {
      state.currentSong = curSong
    },
    CURRENTSONG_INFO: (state, curSongInfo) => {
      state.currentSongInfo = curSongInfo
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
