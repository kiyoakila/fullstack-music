import { createStore, action } from 'easy-peasy'

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  activePlaylist: null,
  isPlaying: false,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload
  }),
  changeActivePlaylist: action((state: any, payload) => {
    state.activePlaylist = payload
  }),
  changePlayingState: action((state: any, payload) => {
    state.isPlaying = payload
  }),
})
