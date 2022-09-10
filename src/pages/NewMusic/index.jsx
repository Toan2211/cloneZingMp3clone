import React, { useEffect, useState } from 'react'
import Loading from 'components/Loading'
import audioApi from 'api/audioAPI'
import './index.scss'
import SongItem from 'page-components/SongItem'
import { useDispatch } from 'react-redux'
import handlePlaySong from 'utils/handlePlaySong'

function NewMusic() {
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
                        onClick={() => handlePlaySong (item, data.items, data.sectionId, dispatch)}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewMusic
