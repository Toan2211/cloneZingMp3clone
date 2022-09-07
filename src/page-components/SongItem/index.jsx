import React from 'react'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGripLines,
    faPause,
    faPlay
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setIsPlay } from 'redux/audioSlice'

function SongItem(props) {
    const dispatch = useDispatch()
    const { serial, song, index, onClick, type, className } = props
    const isPlay = useSelector(state => state.audio.isPlay)
    const songId = useSelector(state => state.audio.songId)
    return (
        <div
            className={`${type === 'mini' ? 'mini ' : ''}${
                className === 'currentSong' ? 'currentSong ' : ''
            }song-item-container`}
            onDoubleClick={onClick}
        >
            <div className="content-left">
                {serial && <p className="serial">{index + 1}</p>}
                {serial && (
                    <div className="left-icon">
                        <FontAwesomeIcon icon={faGripLines} />
                    </div>
                )}
                <div className="avatar">
                    <img
                        src={song.thumbnail}
                        alt={song.alias}
                        className="avatar-img"
                    />

                    {songId === song.encodeId && isPlay ? (
                        <div
                            className="song-play-button"
                            onClick={() => dispatch(setIsPlay(false))}
                        >
                            <FontAwesomeIcon icon={faPause} />
                        </div>
                    ) : (
                        <div
                            className="song-play-button"
                            onClick={() => dispatch(setIsPlay(true))}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    )}
                    {songId !== song.encodeId && (
                        <div
                            className="song-play-button"
                            onClick={onClick}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    )}
                </div>
                <div className="song-item-info">
                    <div className="song-item-info-title">
                        <span className="song-item-name">
                            {song.title}
                        </span>
                        {songId.streamingStatus !== 1 &&
                            !song.isWorldWide && (
                            <span className="vip">VIP</span>
                        )}
                    </div>
                    <div className="song-item-info-artists">
                        {song.artists ? (
                            song.artists.map((artist, index) => (
                                <span key={artist.id}>
                                    <Link
                                        className="name-singer"
                                        to="/"
                                        state={{
                                            artistName: artist.alias
                                        }}
                                    >
                                        {artist.name}
                                    </Link>
                                    {index + 1 === song.artists.length
                                        ? ''
                                        : ', '}
                                </span>
                            ))
                        ) : (
                            <span className="song-item-info-artists">
                                {song.artistsNames}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="content-center">
                {song.album ? (
                    <Link
                        className="name-album"
                        to="/"
                        state={{ id: song.album.id }}
                    >
                        {song.album.title}
                    </Link>
                ) : (
                    <></>
                )}
            </div>
            <div className="content-right">
                <p className="song-time">
                    {Math.floor(song.duration / 60) < 10
                        ? '0' + Math.floor(song.duration / 60)
                        : Math.floor(song.duration / 60)}
                    :
                    {song.duration % 60 < 10
                        ? '0' + Math.floor(song.duration % 60)
                        : Math.floor(song.duration % 60)}
                </p>
            </div>
        </div>
    )
}

export default SongItem
