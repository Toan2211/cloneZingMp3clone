import audioApi from 'api/audioAPI'
import Item from 'components/Item'
import Loading from 'components/Loading'
import Section from 'components/Section'
import SongItem from 'page-components/SongItem'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
    setCurrentIndexSong,
    setCurrentIndexSongRandom,
    setCurrentTime,
    setInfoSongPlayer,
    setIsLoop,
    setIsPlay,
    setPlayListId,
    setPlaylistRandom,
    setPlaylistSong,
    setSongId,
    setSrcAudio
} from 'redux/audioSlice'
import './index.scss'
function SearchResult() {
    const dispatch = useDispatch()
    const params = useLocation().state
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const handlePlaySong = song => {
        if (song.streamingStatus === 1 && song.isWorldWide) {
            dispatch(setCurrentTime(0))
            dispatch(setSrcAudio(''))
            dispatch(setCurrentIndexSong(0))
            dispatch(setCurrentIndexSongRandom(0))
            dispatch(setIsPlay(false))
            dispatch(setSongId(song.encodeId))
            dispatch(setInfoSongPlayer(song))
            dispatch(setPlaylistSong([song]))
            dispatch(setPlaylistRandom([song]))
            dispatch(setPlayListId('searchresults'))
            dispatch(setIsLoop(true))
            dispatch(setIsPlay(true))
        } else alert('THIS IS VIP SONG')
    }
    useEffect(() => {
        (async () => {
            const datafromServer = await audioApi.getResultSearch(
                params
            )
            setData(datafromServer.data)
            setIsLoading(false)
            document.title = 'Search Page'
        })()
    }, [params])
    if (isLoading) return <Loading />
    return (
        <div className="search-result-page-container">
            <h3 className="search-result-title">
                Kết quả tìm kiếm cho từ khóa: {params.keyword}
            </h3>
            <div className="search-result-list-song">
                {data.songs &&
                    data.songs.map(song => (
                        <SongItem
                            key={song.encodeId}
                            song={song}
                            onClick={() => handlePlaySong(song)}
                        />
                    ))}
            </div>
            <div className="search-result-playlist">
                {data.playlists && (
                    <Section key={data.sectionId} canFull={true}>
                        {data.playlists.map(item => (
                            <Item key={item.encodeId} data={item} />
                        ))}
                    </Section>
                )}
            </div>
        </div>
    )
}

export default SearchResult
