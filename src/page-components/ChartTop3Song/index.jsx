import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import './index.scss'
ChartJS.register(...registerables)
function ChartTop3Song({ data }) {
    console.log(data)
    const topSongIdArr = Object.keys(data.chart.items)
    const labels = data.chart.times.map(time => `${time.hour}:00`)

    const getSongScrore = id =>
        data.chart.items[id].map(item => item.counter)
    const getSongScoreTotal = topSongIdArr => {
        let result = []
        for (let id of topSongIdArr) {
            const data = getSongScrore(id)
            if (result.length === 0) {
                result = [...getSongScrore(id)]
            } else {
                for (let i in data) {
                    result[i] += data[i]
                }
            }
        }
        return result
    }
    const SongScoreTotalValue = getSongScoreTotal(topSongIdArr)
    const getPercentTopSong = (id, SongScoreTotalValue) =>
        getSongScrore(id).map((item, index) =>
            Math.round((item * 100) / SongScoreTotalValue[index])
        )
    const getInfoSong = id => {
        return data.items.find(item => item.encodeId === id)
    }
    const state = {
        labels,
        datasets: [
            {
                label: getInfoSong(topSongIdArr[0]).title,
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: '#4A90E2',
                borderWidth: 2,
                data: getSongScrore(topSongIdArr[0])
            },
            {
                label: getInfoSong(topSongIdArr[1]).title,
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: '#27BD9C',
                borderWidth: 2,
                data: getSongScrore(topSongIdArr[1])
            },
            {
                label: getInfoSong(topSongIdArr[2]).title,
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: '#E35050',
                borderWidth: 2,
                data: getSongScrore(topSongIdArr[2])
            }
        ]
    }

    return (
        <div className="chart-top-3-song-container">
            <Line
                data={state}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 16000,
                            ticks: {
                                display: false,
                                stepSize: 4000
                            },
                            grid: {
                                display: true,
                                color: '#A0A0A0',
                                borderDash: [4, 2]
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 0,
                                // minRotation: 0,
                                color: 'white',
                                maxTicksLimit: 12
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default ChartTop3Song
