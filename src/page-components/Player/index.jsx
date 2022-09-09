import React, { useEffect, useRef } from 'react'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faVolumeHigh,
    faShuffle,
    faBackwardStep,
    faPlayCircle,
    faRepeat,
    faForwardStep,
    faPauseCircle,
    faVolumeMute
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import {
    setCurrentIndexSongRandom,
    setCurrentTime,
    setCurrentIndexSong,
    setInfoSongPlayer,
    setIsLoop,
    setIsPlay,
    setIsRandom,
    setSongId,
    setSrcAudio,
    setVolume
} from 'redux/audioSlice'
import audioApi from 'api/audioAPI'

function Player() {
    const dispatch = useDispatch()
    const playlistSong = useSelector(
        state => state.audio.playlistSong
    )
    const playlistSongRandom = useSelector(
        state => state.audio.playlistRandom
    )
    const currentIndexSong = useSelector(
        state => state.audio.currentIndexSong
    )
    const currentIndexSongRandom = useSelector(
        state => state.audio.currentIndexSongRandom
    )
    const currentSongId = useSelector(state => state.audio.songId)
    const volume = useSelector(state => state.audio.volume)
    const volumeRef = useRef(null)
    const audioRef = useRef(null)
    const infoSongPlayer = useSelector(
        state => state.audio.infoSongPlayer
    )
    const isLoop = useSelector(state => state.audio.isLoop)
    const toggleLoop = () => {
        if (isLoop) dispatch(setIsLoop(false))
        else dispatch(setIsLoop(true))
    }
    const isRandom = useSelector(state => state.audio.isRandom)
    const toggleRandom = () => {
        dispatch(setIsRandom(!isRandom))
    }
    const isPlay = useSelector(state => state.audio.isPlay)
    const togglePlay = () => {
        if (isPlay) {
            dispatch(setIsPlay(false))
        } else {
            dispatch(setIsPlay(true))
        }
    }
    const onChangeVolume = () => {
        dispatch(setVolume(volumeRef.current.value))
        audioRef.current.volume = volumeRef.current.value / 100
    }
    const srcAudio = useSelector(state => state.audio.srcAudio)
    useEffect(() => {
        if (currentSongId !== null && currentSongId !== '') {
            (async () => {
                try {
                    const srcAudioApi = await audioApi.getAudio(
                        currentSongId
                    )
                    dispatch(setSrcAudio(srcAudioApi.data[128]))
                } catch (err) {
                    alert(err)
                }
            })()
        }
    }, [currentSongId])

    useEffect(() => {
        if (srcAudio !== '') {
            isPlay
                ? audioRef.current.play()
                : audioRef.current.pause()
        }
    }, [srcAudio, isPlay])
    const progressRef = useRef(null)
    const currentTime = useSelector(state => state.audio.currentTime)
    const onChangeCurrentTime = () => {
        dispatch(
            setCurrentTime(Math.floor(progressRef.current.value))
        )
        audioRef.current.currentTime = progressRef.current.value
    }
    const onTimeUpdate = () => {
        if (audioRef.current) {
            dispatch(
                setCurrentTime(
                    Math.floor(audioRef.current.currentTime)
                )
            )
        }
    }
    const handleOnEnded = () => {
        if (!isLoop) {
            dispatch(setCurrentTime(0))
            dispatch(setIsPlay(false))
            if (isRandom) {
                if (
                    currentIndexSongRandom ===
                    playlistSongRandom.length - 1
                ) {
                    dispatch(setCurrentIndexSongRandom(0))
                    dispatch(
                        setCurrentIndexSong(
                            playlistSong.indexOf(
                                playlistSongRandom[0]
                            )
                        )
                    )
                    dispatch(setInfoSongPlayer(playlistSongRandom[0]))
                    dispatch(
                        setSongId(playlistSongRandom[0].encodeId)
                    )
                } else {
                    dispatch(
                        setCurrentIndexSongRandom(
                            currentIndexSongRandom + 1
                        )
                    )
                    dispatch(
                        setCurrentIndexSong(
                            playlistSong.indexOf(
                                playlistSongRandom[
                                    currentIndexSongRandom + 1
                                ]
                            )
                        )
                    )
                    dispatch(
                        setInfoSongPlayer(
                            playlistSongRandom[
                                currentIndexSongRandom + 1
                            ]
                        )
                    )
                    dispatch(
                        setSongId(
                            playlistSongRandom[
                                currentIndexSongRandom + 1
                            ].encodeId
                        )
                    )
                }
                dispatch(setSrcAudio(''))
                dispatch(setIsPlay(true))
            } else {
                if (currentIndexSong === playlistSong.length - 1) {
                    dispatch(setCurrentIndexSong(0))
                    dispatch(setInfoSongPlayer(playlistSong[0]))
                    dispatch(setSongId(playlistSong[0].encodeId))
                } else {
                    dispatch(
                        setCurrentIndexSong(currentIndexSong + 1)
                    )
                    dispatch(
                        setInfoSongPlayer(
                            playlistSong[currentIndexSong + 1]
                        )
                    )
                    dispatch(
                        setSongId(
                            playlistSong[currentIndexSong + 1]
                                .encodeId
                        )
                    )
                }
                dispatch(setSrcAudio(''))
                dispatch(setIsPlay(true))
            }
        }
    }
    const hanlePrevButton = () => {
        dispatch(setCurrentTime(0))
        audioRef.current.currentTime = 0
        if (isRandom) {
            if (currentIndexSongRandom > 0) {
                dispatch(
                    setCurrentIndexSongRandom(
                        currentIndexSongRandom - 1
                    )
                )
                dispatch(
                    setInfoSongPlayer(
                        playlistSongRandom[currentIndexSongRandom - 1]
                    )
                )
                dispatch(
                    setSongId(
                        playlistSongRandom[currentIndexSongRandom - 1]
                            .encodeId
                    )
                )
                dispatch(
                    setCurrentIndexSong(
                        playlistSong.findIndex(
                            item =>
                                item.encodeId ===
                                infoSongPlayer.encodeId
                        )
                    )
                )
                dispatch(setIsPlay(true))
                dispatch(setSrcAudio(''))
            }
        } else {
            if (currentIndexSong > 0) {
                dispatch(setCurrentIndexSongRandom(-1))
                dispatch(setCurrentIndexSong(currentIndexSong - 1))
                dispatch(
                    setInfoSongPlayer(
                        playlistSong[currentIndexSong - 1]
                    )
                )
                dispatch(
                    setSongId(
                        playlistSong[currentIndexSong - 1].encodeId
                    )
                )
                dispatch(setIsPlay(true))
                dispatch(setSrcAudio(''))
            }
        }
    }
    const handleNextButton = () => {
        dispatch(setCurrentTime(0))
        audioRef.current.currentTime = 0
        if (isRandom) {
            if (
                currentIndexSongRandom <
                playlistSongRandom.length - 1
            ) {
                dispatch(
                    setCurrentIndexSongRandom(
                        currentIndexSongRandom + 1
                    )
                )
                dispatch(
                    setInfoSongPlayer(
                        playlistSongRandom[currentIndexSongRandom + 1]
                    )
                )
                dispatch(
                    setSongId(
                        playlistSongRandom[currentIndexSongRandom + 1]
                            .encodeId
                    )
                )
                dispatch(
                    setCurrentIndexSong(
                        playlistSong.findIndex(
                            item =>
                                item.encodeId ===
                                playlistSongRandom[
                                    currentIndexSongRandom + 1
                                ].encodeId
                        )
                    )
                )
                dispatch(setIsPlay(true))
                dispatch(setSrcAudio(''))
            } else {
                dispatch(setCurrentIndexSongRandom(0))
                dispatch(setInfoSongPlayer(playlistSongRandom[0]))
                dispatch(setSongId(playlistSongRandom[0].encodeId))
                dispatch(
                    setCurrentIndexSong(
                        playlistSong.findIndex(
                            item =>
                                item.encodeId ===
                                playlistSongRandom[0].encodeId
                        )
                    )
                )
                dispatch(setIsPlay(true))
                dispatch(setSrcAudio(''))
            }
        } else {
            if (currentIndexSong < playlistSong.length - 1) {
                dispatch(setCurrentIndexSongRandom(-1))
                dispatch(setCurrentIndexSong(currentIndexSong + 1))
                dispatch(
                    setInfoSongPlayer(
                        playlistSong[currentIndexSong + 1]
                    )
                )
                dispatch(
                    setSongId(
                        playlistSong[currentIndexSong + 1].encodeId
                    )
                )
                dispatch(setIsPlay(true))
                dispatch(setSrcAudio(''))
            } else {
                dispatch(setCurrentIndexSongRandom(-1))
                dispatch(setCurrentIndexSong(0))
                dispatch(setInfoSongPlayer(playlistSong[0]))
                dispatch(setSongId(playlistSong[0].encodeId))
                dispatch(setIsPlay(true))
                dispatch(setSrcAudio(''))
            }
        }
    }
    return (
        <div className="player-container">
            <div className="player">
                <div className="player-info">
                    <img
                        className="player-info-img"
                        src={infoSongPlayer.thumbnail}
                        alt={infoSongPlayer.alias}
                    />
                    <div className="player-info-name">
                        <h3 className="player-info-title">
                            {infoSongPlayer.title}
                        </h3>
                        <p className="player-info-name-artist">
                            {infoSongPlayer.artistsNames}
                        </p>
                    </div>
                </div>
                <div className="player-control">
                    <div className="handler">
                        <button
                            className={`${
                                isRandom ? 'active ' : ''
                            }control-btn random-btn`}
                            onClick={toggleRandom}
                        >
                            <FontAwesomeIcon
                                type="rounded"
                                icon={faShuffle}
                            />
                        </button>
                        <button
                            className="control-btn prev-btn"
                            onClick={hanlePrevButton}
                        >
                            <FontAwesomeIcon
                                type="rounded"
                                icon={faBackwardStep}
                            />
                        </button>
                        <button
                            className="control-btn play-btn"
                            onClick={togglePlay}
                        >
                            {isPlay ? (
                                <FontAwesomeIcon
                                    type="rounded"
                                    icon={faPauseCircle}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    type="rounded"
                                    icon={faPlayCircle}
                                />
                            )}
                        </button>
                        <button
                            className="control-btn next-btn"
                            onClick={handleNextButton}
                        >
                            <FontAwesomeIcon
                                type="rounded"
                                icon={faForwardStep}
                            />
                        </button>
                        <button
                            className={`${
                                isLoop ? 'active ' : ''
                            }control-btn loop-btn`}
                            onClick={toggleLoop}
                        >
                            <FontAwesomeIcon
                                type="rounded"
                                icon={faRepeat}
                            />
                        </button>
                    </div>
                    <div className="range">
                        <span className="time">
                            {Math.floor(currentTime / 60) < 10
                                ? '0' + Math.floor(currentTime / 60)
                                : Math.floor(currentTime / 60)}
                            :
                            {Math.floor(currentTime % 60) < 10
                                ? '0' + Math.floor(currentTime % 60)
                                : Math.floor(currentTime % 60)}
                        </span>
                        <input
                            type="range"
                            className="audio-progress"
                            ref={progressRef}
                            min={0}
                            max={infoSongPlayer.duration}
                            value={currentTime}
                            onChange={onChangeCurrentTime}
                        />
                        <span className="time">
                            {Math.floor(
                                infoSongPlayer.duration / 60
                            ) < 10
                                ? '0' +
                                  Math.floor(
                                      infoSongPlayer.duration / 60
                                  )
                                : Math.floor(
                                    infoSongPlayer.duration / 60
                                )}
                            :
                            {Math.floor(
                                infoSongPlayer.duration % 60
                            ) < 10
                                ? '0' +
                                  Math.floor(
                                      infoSongPlayer.duration % 60
                                  )
                                : Math.floor(
                                    infoSongPlayer.duration % 60
                                )}
                        </span>
                    </div>
                </div>
                <div className="player-options">
                    <div className="volume">
                        <button className="volume-button">
                            {volume == 0 ? (
                                <FontAwesomeIcon
                                    icon={faVolumeMute}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faVolumeHigh}
                                />
                            )}
                        </button>
                        <input
                            ref={volumeRef}
                            type="range"
                            className="volumn-progress"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={onChangeVolume}
                        />
                    </div>
                </div>
            </div>
            <audio
                loop={isLoop}
                ref={audioRef}
                autoPlay={isPlay}
                src={srcAudio}
                onTimeUpdate={onTimeUpdate}
                onEnded={handleOnEnded}
            />
        </div>
    )
}

export default Player
