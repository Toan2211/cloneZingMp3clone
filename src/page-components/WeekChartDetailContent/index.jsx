import React, { useEffect, useState } from 'react'
import './index.scss'
import { useLocation } from 'react-router-dom'
import audioApi from 'api/audioAPI'
import Loading from 'components/Loading'
import SongItem from 'page-components/SongItem'

function WeekChartDetailContent(props) {
    const { onClick } = props
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const id = useLocation().state.id
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const datafromServer =
                    await audioApi.getDetailPlayList(id)
                setData(datafromServer.data.song.items)
                setIsLoading(false)
            } catch (err) {
                alert(err.message)
            }
        })()
    }, [id])
    if (isLoading) return <Loading />
    return (
        <div className="WeekChartDetailContent-container">
            <div className="WeekChartDetailContent-content">
                {data.map((song, index) => (
                    <SongItem
                        key={song.encodeId}
                        song={song}
                        serial={true}
                        index={index}
                        onClick={() => onClick(song, data, id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default WeekChartDetailContent
