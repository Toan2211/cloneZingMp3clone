import React from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import SongItem from 'page-components/SongItem'
import {
    setCurrentIndexSong,
    setCurrentIndexSongRandom,
    setCurrentTime,
    setInfoSongPlayer,
    setIsPlay,
    setSongId,
    setSrcAudio
} from 'redux/audioSlice'

function RightSidebar() {
    const dispatch = useDispatch()
    const playlistSong = useSelector(
        state => state.audio.playlistSong
    )
    const playlistSongRandom = useSelector(
        state => state.audio.playlistRandom
    )
    const isRandom = useSelector(state => state.audio.isRandom)

    const currentSongId = useSelector(
        state => state.audio.currentSongId
    )
    const infoSongPlayer = useSelector(
        state => state.audio.infoSongPlayer
    )
    const handleOnClick = song => {
        dispatch(
            setCurrentIndexSongRandom(
                playlistSongRandom.indexOf(song)
            )
        )
        dispatch(setCurrentIndexSong(playlistSong.indexOf(song)))
        dispatch(setInfoSongPlayer(song))
        dispatch(setSongId(song.encodeId))
        dispatch(setSrcAudio(''))
        dispatch(setCurrentTime(0))
        dispatch(setIsPlay(true))
    }
    const currentIndexSong = useSelector(
        state => state.audio.currentIndexSong
    )
    const currentIndexSongRandom = useSelector(
        state => state.audio.currentIndexSongRandom
    )
    return (
        <div className="wrapper_rightsidebar">
            <div className="right-sidebar-header">
                <h1 className="right-sidebar-title">
                    Danh sách phát
                </h1>
            </div>
            <div className="right-sidebar-content">
                <SongItem
                    song={infoSongPlayer}
                    type="mini"
                    className="currentSong"
                />

                {!isRandom &&
                    playlistSong.map((song, index) => {
                        if (
                            song.streamingStatus !== 1 ||
                            song.encodeId === currentSongId
                        )
                            return
                        else {
                            return (
                                index > currentIndexSong && (
                                    <SongItem
                                        key={song.encodeId}
                                        serial={false}
                                        song={song}
                                        index={index}
                                        onClick={() =>
                                            handleOnClick(song)
                                        }
                                        type="mini"
                                    />
                                )
                            )
                        }
                    })}
                {isRandom &&
                    playlistSongRandom.map((song, index) => {
                        if (
                            song.streamingStatus !== 1 ||
                            song.encodeId === currentSongId
                        )
                            return
                        return (
                            index > currentIndexSongRandom && (
                                <SongItem
                                    key={song.encodeId}
                                    serial={false}
                                    song={song}
                                    index={index}
                                    onClick={() =>
                                        handleOnClick(song)
                                    }
                                    type="mini"
                                />
                            )
                        )
                    })}
            </div>
        </div>
    )
}

export default RightSidebar
