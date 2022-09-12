import React, { useEffect, useState } from 'react'
import Loading from 'components/Loading'
import './index.scss'
import audioApi from 'api/audioAPI'
import ChartSong from 'page-components/ChartSong'
import WeekChart from 'page-components/WeekChart'
import handlePlaySong from 'utils/handlePlaySong'
import ChartTop3Song from 'page-components/ChartTop3Song'


function Chart() {
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

    if (isLoading) return <Loading />
    return (
        <div className="chart-container">
            <header>
                <h3 className="chart-header-title">ZingChart#</h3>
            </header>
            <ChartTop3Song data = {data.RTChart}/>
            <ChartSong data={data} onClick={handlePlaySong} />
            <WeekChart
                data={data.weekChart}
                onClick={handlePlaySong}
            />
        </div>
    )
}

export default Chart
