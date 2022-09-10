import React, { useEffect, useState } from 'react'
import './index.scss'
import { Link, useLocation } from 'react-router-dom'
import Loading from 'components/Loading'
import audioApi from 'api/audioAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPauseCircle,
    faPlayCircle
} from '@fortawesome/free-solid-svg-icons'
import SongItem from 'page-components/SongItem'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCurrentIndexSong,
    setCurrentIndexSongRandom,
    setCurrentTime,
    setInfoSongPlayer,
    setIsPlay,
    setIsRandom,
    setPlayListId,
    setPlaylistRandom,
    setPlaylistSong,
    setSongId,
    setSrcAudio
} from 'redux/audioSlice'
import { shuffle } from 'utils/shuffle'
import handlePlaySong from 'utils/handlePlaySong'

function DetailPlaylist() {
    const dispatch = useDispatch()
    const location = useLocation()
    const playlistId = location.state.id
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const isPlay = useSelector(state => state.audio.isPlay)
    const playlistIdInStore = useSelector(
        state => state.audio.playListId
    )
    const handlePlaySongRandom = (playListSong, playlistId) => {
        let playListCanPlay = []
        dispatch(setIsPlay(false))
        dispatch(setCurrentTime(0))
        dispatch(setSrcAudio(''))
        playListCanPlay = playListSong.filter(
            item => item.streamingStatus === 1 && item.isWorldWide
        )
        const playListRandom = shuffle(playListCanPlay)
        dispatch(setPlayListId(playlistId))
        dispatch(setPlaylistSong(playListCanPlay))
        dispatch(setPlaylistRandom(playListRandom))
        dispatch(setInfoSongPlayer(playListRandom[0]))
        dispatch(setSongId(playListRandom[0].encodeId))
        dispatch(setCurrentIndexSongRandom(0))
        dispatch(
            setCurrentIndexSong(
                playListCanPlay.indexOf(playListRandom[0])
            )
        )
        dispatch(setIsPlay(true))
        dispatch(setIsRandom(true))
    }
    const handlePauseSong = () => {
        dispatch(setIsPlay(false))
    }
    const handlePlaySongbtn = () => {
        dispatch(setIsPlay(true))
    }
    useEffect(() => {
        (async () => {
            try {
                const dataFromServer =
                    await audioApi.getDetailPlayList(playlistId)
                setData(dataFromServer.data)
                setIsLoading(false)
            } catch (err) {
                alert(err.message)
            }
        })()
    }, [playlistId])
    if (isLoading) return <Loading />
    return (
        <div className="detail-playlist-container">
            <div className="detail-playlist-info">
                {isPlay && playlistId === playlistIdInStore && (
                    <div className="detail-playlist-avatar play">
                        <img
                            src={data.thumbnailM}
                            alt={data.aliasTitle}
                            className="detail-playlist-img"
                        />
                        <div className="detail-playlist-play">
                            <FontAwesomeIcon
                                icon={faPauseCircle}
                                className="detail-playlist-play-btn"
                                onClick={handlePauseSong}
                            />
                        </div>
                    </div>
                )}
                {playlistId !== playlistIdInStore && (
                    <div className="detail-playlist-avatar">
                        <img
                            src={data.thumbnailM}
                            alt={data.aliasTitle}
                            className="detail-playlist-img"
                        />
                        <div className="detail-playlist-play">
                            <FontAwesomeIcon
                                icon={faPlayCircle}
                                className="detail-playlist-play-btn"
                                onClick={() =>
                                    handlePlaySongRandom(
                                        data.song.items,
                                        playlistId
                                    )
                                }
                            />
                        </div>
                    </div>
                )}
                {!isPlay && playlistId === playlistIdInStore && (
                    <div className="detail-playlist-avatar">
                        <img
                            src={data.thumbnailM}
                            alt={data.aliasTitle}
                            className="detail-playlist-img"
                        />
                        <div className="detail-playlist-play">
                            <FontAwesomeIcon
                                icon={faPlayCircle}
                                className="detail-playlist-play-btn"
                                onClick={handlePlaySongbtn}
                            />
                        </div>
                    </div>
                )}
                <div className="detail-playlist-description">
                    <h3 className="detail-playlist-title">
                        {data.title}
                    </h3>
                    <div className="detail-playlist-artists">
                        {data.artists ? (
                            data.artists.map((artist, index) => (
                                <span key={artist.id}>
                                    <Link
                                        to="/"
                                        className="detail-playlist-artist-link"
                                        state={{
                                            artistName: artist.alias
                                        }}
                                    >
                                        {artist.name}
                                    </Link>
                                    {index === data.artists.length - 1
                                        ? ''
                                        : ', '}
                                </span>
                            ))
                        ) : (
                            <span>User create: {data.userName}</span>
                        )}
                    </div>
                    <p className="liked">
                        {data.like} người yêu thích
                    </p>
                </div>
            </div>
            <div className="detail-playlist-content">
                <div className="detail-playlist-short-description">
                    <p className="detail-playlist-short-description-content">
                        {data.sortDescription}
                    </p>
                    {data.song.items.map((song, index) => (
                        <SongItem
                            key={song.encodeId}
                            index={index}
                            song={song}
                            onClick={() =>
                                handlePlaySong(
                                    song,
                                    data.song.items,
                                    playlistId,
                                    dispatch
                                )
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailPlaylist
