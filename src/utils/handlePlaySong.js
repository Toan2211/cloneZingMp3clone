import {
    setCurrentIndexSong,
    setCurrentIndexSongRandom,
    setCurrentTime,
    setInfoSongPlayer,
    setIsPlay,
    setPlayListId,
    setPlaylistRandom,
    setPlaylistSong,
    setSongId,
    setSrcAudio
} from 'redux/audioSlice'
import { shuffle } from './shuffle'
export default function handlePlaySong(song, playListSong, playlistId, dispatch) {
    let playListCanPlay = []
    if (song.streamingStatus === 1 && song.isWorldWide) {
        dispatch(setIsPlay(false))
        dispatch(setCurrentTime(0))
        dispatch(setSrcAudio(''))
        playListCanPlay = playListSong.filter(
            item => item.streamingStatus === 1 && item.isWorldWide
        )
        dispatch(setPlaylistSong(playListCanPlay))
        dispatch(setPlaylistRandom(shuffle(playListCanPlay)))
        dispatch(setPlayListId(playlistId))
        dispatch(setSongId(song.encodeId))
        dispatch(setInfoSongPlayer(song))
        dispatch(setCurrentIndexSongRandom(-1))
        dispatch(setCurrentIndexSong(playListCanPlay.findIndex(item => item.encodeId === song.encodeId)))
        dispatch(setIsPlay(true))
    } else {
        alert('this is vip song')
    }
}
