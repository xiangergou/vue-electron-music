/*
 * @Author: liuxia
 * @Date: 2019-03-13 20:54:56
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-20 09:11:36
 */
import { playListApi } from '@/api/playList'

const playList = {
  // namespaced: true,
  state: {
    palyList: [],
    currentSong: {},
    currentSongInfo: {},
    currentIndex: 0,
    mode: 0
  },
  getters: {
    palyList: state => state.palyList,
    currentIndex: state => state.currentIndex,
    currentSong: state => state.palyList[state.currentIndex] || {},
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
    },
    SET_CRT_SONG_LIST: (state, songData) => {
      state.palyList = songData.list
      state.currentIndex = songData.index
      state.currentSong = songData.list[songData.index]
    },
    SET_CURRENT_INDEX: (state, index) => {
      state.currentIndex = (index < state.palyList.length) ? index : 0
    }
  },
  actions: {
    // setCrtSong ({ commit }, curSong) {
    //   commit('SET_CURRENTSONG', curSong)
    // },

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
    },

    querySong ({ commit }, param) {
      return new Promise((resolve, reject) => {
        playListApi.querySong(param).then(response => {
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
