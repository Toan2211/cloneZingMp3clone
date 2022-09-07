import React, { useEffect, useState } from 'react'
import Loading from 'components/Loading'
import './index.scss'
import audioApi from 'api/audioAPI'
import ChartSong from 'page-components/ChartSong'
import WeekChart from 'page-components/WeekChart'
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

function Chart() {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const chartData = await audioApi.getDataChartPage()
                setData(chartData.data)
                setLoading(false)
                document.title = 'chart'
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
                setCurrentIndexSong(playlistCanPlay.findIndex(songarr => songarr.encodeId === song.encodeId))
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
        <div className="chart-container">
            <header>
                <h3 className="chart-header-title">ZingChart#</h3>
            </header>
            <ChartSong data={data} onClick={handlePlaySong} />
            <WeekChart
                data={data.weekChart}
                onClick={handlePlaySong}
            />
        </div>
    )
}

export default Chart
