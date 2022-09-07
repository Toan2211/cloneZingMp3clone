import React, { useState } from 'react'
import './index.scss'
import SongItem from 'page-components/SongItem'

function ChartSong(props) {
    const { data, onClick } = props
    const [songList, setSongList] = useState(
        data.RTChart.items.slice(0, 10)
    )
    const [contentBtn, setContentBtn] = useState('Tất cả')
    const [isFullSong, setIsFullSong] = useState(false)
    const handleExpand = () => {
        if (isFullSong) {
            setContentBtn('Tất cả')
            setIsFullSong(false)
            setSongList(data.RTChart.items.slice(0, 10))
        } else {
            setContentBtn('Thu gọn')
            setIsFullSong(true)
            setSongList(data.RTChart.items)
        }
    }
    return (
        <div className="chart-song-container">
            <div className="chart-list-song">
                {songList.map((song, index) => (
                    <SongItem
                        key={song.encodeId}
                        serial={true}
                        song={song}
                        index={index}
                        onClick={() =>
                            onClick(
                                song,
                                data.RTChart.items,
                                data.RTChart.sectionId
                            )
                        }
                    />
                ))}
            </div>
            <button className="expand-button" onClick={handleExpand}>
                {contentBtn}
            </button>
        </div>
    )
}

export default ChartSong
