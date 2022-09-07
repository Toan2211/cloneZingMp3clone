import React, { useEffect, useState } from 'react'
import './index.scss'
import { Link, useLocation } from 'react-router-dom'
import Loading from 'components/Loading'
import audioApi from 'api/audioAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import SongItem from 'page-components/SongItem'
import { useDispatch } from 'react-redux'
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
import { shuffle } from 'utils/shuffle'

function DetailPlaylist() {
    const dispatch = useDispatch()
    const location = useLocation()
    const playlistId = location.state.id
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const handlePlaySong = (playlistId, playListSong, song) => {
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
            dispatch(
                setCurrentIndexSong(playListCanPlay.indexOf(song))
            )
            dispatch(setSongId(song.encodeId))
            dispatch(setInfoSongPlayer(song))
            dispatch(setCurrentIndexSongRandom(-1))
            dispatch(setIsPlay(true))
        } else {
            alert('this is vip song')
        }
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
                        />
                    </div>
                </div>
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
                                    playlistId,
                                    data.song.items,
                                    song
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
