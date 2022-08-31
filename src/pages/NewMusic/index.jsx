import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import audioApi from 'api/audioAPI'
import './index.scss'
import SongItem from 'page-components/SongItem'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentIndexSongRandom, setCurrentTime, setCurrentIndexSong, setInfoSongPlayer, setIsPlay, setPlayListId, setPlaylistRandom, setPlaylistSong, setSongId, setSrcAudio } from 'redux/audioSlice'
NewMusic.propTypes = {}

function NewMusic(props) {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const dataMusic = await audioApi.getNewMusic()
                setData(dataMusic.data)
                document.title = dataMusic.data.title
            } catch (err) {
                alert(err)
            }
            setLoading(false)
        })()
    }, [])
    const shuffle = (array) => {
        const arrayOri = [...array]
        const arrShuffle = []
        const length = arrayOri.length
        while (arrShuffle.length < length) {
            const index = Math.floor(Math.random() * arrayOri.length)
            arrShuffle.push(arrayOri[index])
            arrayOri.splice(index, 1)
        }
        return arrShuffle
    }
    const isRandom = useSelector((state) => state.audio.isRandom)
    const handlePlaySong = (song, playList, id) => {
        dispatch(setCurrentTime(0))
        dispatch(setSrcAudio(''))
        dispatch(setInfoSongPlayer(song))
        dispatch(setPlayListId(id))
        let playListPlay = playList.filter((item) => item.streamingStatus === 1)
        if (song.streamingStatus === 1) {
            dispatch(setPlaylistSong(playListPlay))
            dispatch(setInfoSongPlayer(song))
            dispatch(setSongId(song.encodeId))
            dispatch(setCurrentIndexSong(playListPlay.findIndex((item) => item.encodeId === song.encodeId)))
            dispatch(setCurrentIndexSongRandom(-1))
            dispatch(setIsPlay(true))
            if (isRandom)
                dispatch(setPlaylistRandom(shuffle(playListPlay)))
        }
        else {
            alert('This is vip song')
        }
    }
    if (isLoading) return <Loading />

    return (
        <div className="new-music-container">
            <div className="new-music-header">
                <h3 className="new-music-header__title">
                    {data.title}
                </h3>
            </div>
            <div className="new-music-content">
                {data.items.map((item, index) => (
                    <SongItem
                        key={index}
                        serial={true}
                        song={item}
                        index={index}
                        onClick={() => handlePlaySong (item, data.items, data.sectionId)}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewMusic
