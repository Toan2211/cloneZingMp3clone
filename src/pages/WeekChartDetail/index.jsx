import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'
import audioApi from 'api/audioAPI'
import Loading from 'components/Loading'
import WeekChartDetailContent from 'page-components/WeekChartDetailContent'
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
WeekChartDetail.propTypes = {}

function WeekChartDetail() {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                const datafromServer =
                    await audioApi.getDataChartPage()
                setData(datafromServer.data.weekChart)
                setIsLoading(false)
            } catch (err) {
                alert(err.message)
            }
        })()
    }, [])
    const handlePlaySong = (song, playlist, id) => {
        const playlistCanPlay = playlist.filter(
            song => song.streamingStatus === 1 && song.isWorldWide
        )
        dispatch(setSrcAudio(''))
        dispatch(setIsPlay(false))
        dispatch(setCurrentTime(0))
        if (song.streamingStatus === 1 && song.isWorldWide) {
            dispatch(setInfoSongPlayer(song))
            dispatch(
                setCurrentIndexSong(
                    playlistCanPlay.findIndex(
                        songarr => songarr.encodeId === song.encodeId
                    )
                )
            )
            dispatch(setPlaylistSong(playlistCanPlay))
            dispatch(setPlaylistRandom(shuffle(playlistCanPlay)))
            dispatch(setPlayListId(id))
            dispatch(setSongId(song.encodeId))
            dispatch(setCurrentIndexSongRandom(-1))
            dispatch(setIsPlay(true))
        } else {
            alert('This is vip song')
        }
    }
    if (isLoading) return <Loading />
    return (
        <div className="week-chart-detail-container">
            <h3 className="week-chart-detail-title">
                Bảng xếp hạng tuần
            </h3>
            <nav>
                <ul className="week-chart-detail-menu">
                    <li>
                        <NavLink
                            to={data.vn.link}
                            state={{ id: data.vn.playlistId }}
                            className={({ isActive }) =>
                                isActive
                                    ? 'week-chart-detail-item-link active'
                                    : 'week-chart-detail-item-link'
                            }
                        >
                            Việt Nam
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={data.us.link}
                            state={{ id: data.us.playlistId }}
                            className={({ isActive }) =>
                                isActive
                                    ? 'week-chart-detail-item-link active'
                                    : 'week-chart-detail-item-link'
                            }
                        >
                            US-UK
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={data.korea.link}
                            state={{ id: data.korea.playlistId }}
                            className={({ isActive }) =>
                                isActive
                                    ? 'week-chart-detail-item-link active'
                                    : 'week-chart-detail-item-link'
                            }
                        >
                            Korea
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="week-chart-detail-time">
                <span>
                    Tuần{' '}
                    {`${data.vn.latestWeek} ( ${data.vn.startDate} - ${data.vn.endDate} )`}
                </span>
            </div>
            <div className="week-chart-detail-content">
                <WeekChartDetailContent onClick={handlePlaySong} />
            </div>
        </div>
    )
}

export default WeekChartDetail
