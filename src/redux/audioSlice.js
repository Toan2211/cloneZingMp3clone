import { createSlice } from '@reduxjs/toolkit'
import logozing from 'assets/img/logozing.png'
const initialState = {
    isPlay: false,
    isRandom: JSON.parse(localStorage.getItem('random')) || false,
    isLoop: JSON.parse(localStorage.getItem('loop')) || false,
    volume: JSON.parse(localStorage.getItem('volume')) || 100,
    isRadioPlay: false,
    isMute: false,
    songId: localStorage.getItem('songId') || '',
    playListId: localStorage.getItem('playListId') || '',
    srcAudio: '',
    srcRadio: '',
    currentTime: 0,
    currentIndexSong: 0,
    currentIndexSongRandom: 0,
    infoSongPlayer: JSON.parse(localStorage.getItem('songInfo')) || {
        thumbnail: logozing,
        thumbnailM: logozing,
        title: 'Tên bài hát',
        artistsNames: 'artistsNames',
        duration: 0
    },
    playlistSong:
        JSON.parse(localStorage.getItem('playlistSong')) || [],
    playlistRandom:
        JSON.parse(localStorage.getItem('playlistRandom')) || []
}
const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setIsPlay: (state, action) => {
            state.isPlay = action.payload
        },

        setCurrentTime: (state, action) => {
            state.currentTime = action.payload
        },
        setSrcRadio: (state, action) => {
            state.srcRadio = action.payload
        },
        setSrcAudio: (state, action) => {
            state.srcAudio = action.payload
        },
        setVolume: (state, action) => {
            state.volume = action.payload
            localStorage.setItem(
                'volume',
                JSON.stringify(action.payload)
            )
        },
        setInfoSongPlayer: (state, action) => {
            state.infoSongPlayer = { ...action.payload }
            localStorage.setItem(
                'songInfo',
                JSON.stringify({ ...action.payload })
            )
        },
        setSongId: (state, action) => {
            state.songId = action.payload
            localStorage.setItem(
                'songId',
                JSON.stringify(action.payload)
            )
        },
        setIsLoop: (state, action) => {
            state.isLoop = action.payload
            localStorage.setItem(
                'loop',
                JSON.stringify(action.payload)
            )
        },
        setIsRandom: (state, action) => {
            state.isRandom = action.payload
            localStorage.setItem(
                'random',
                JSON.stringify(action.payload)
            )
        },
        setPlayListId: (state, action) => {
            state.playListId = action.payload
            localStorage.setItem(
                'playListId',
                JSON.stringify(action.payload)
            )
        },
        setPlaylistRandom: (state, action) => {
            state.playlistRandom = action.payload
            localStorage.setItem(
                'playlistRandom',
                JSON.stringify(action.payload)
            )
        },
        setPlaylistSong: (state, action) => {
            state.playlistSong = action.payload
            localStorage.setItem(
                'playlistSong',
                JSON.stringify(action.payload)
            )
        },
        setCurrentIndexSong: (state, action) => {
            state.currentIndexSong = action.payload
        },
        setCurrentIndexSongRandom: (state, action) => {
            state.currentIndexSongRandom = action.payload
        }
    }
})

export const {
    setIsPlay,
    setVolume,
    setCurrentTime,
    setSrcRadio,
    setSrcAudio,
    setInfoSongPlayer,
    setSongId,
    setIsLoop,
    setIsRandom,
    setPlayListId,
    setPlaylistRandom,
    setPlaylistSong,
    setCurrentIndexSong,
    setCurrentIndexSongRandom
} = audioSlice.actions
export default audioSlice.reducer
