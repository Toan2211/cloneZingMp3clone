import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from 'hooks/useDebounce'
import audioApi from 'api/audioAPI'
import SongItem from 'page-components/SongItem'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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

function Search() {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const inputRef = useRef(null)
    const handleOnChangeInput = e => {
        setSearchValue(e.target.value)
    }
    const handleonFocusInput = () => setShowResult(true)
    const handleOnBlurInput = () => setShowResult(false)
    const debouceValue = useDebounce(searchValue, 500)
    const handleSearchIconClick = () => setShowResult(false)
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
        setShowResult(false)
    }
    useEffect(() => {
        if (debouceValue === '') {
            setSearchResult([])
            return
        }
        (async () => {
            const params = { keyword: debouceValue }
            const dataSearchResult = await audioApi.getResultSearch(
                params
            )
            if (dataSearchResult.data.songs)
                setSearchResult(
                    dataSearchResult.data.songs.slice(0, 6)
                )
        })()
    }, [debouceValue])
    return (
        <div className="container-search">
            <div className="search">
                <input
                    ref={inputRef}
                    className="search-input"
                    placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                    value={searchValue}
                    onChange={handleOnChangeInput}
                    onFocus={handleonFocusInput}
                    // onBlur={handleOnBlurInput}
                />
                <button className="search-btn">
                    <Link
                        className="search-icon"
                        to={`/search/${searchValue}`}
                        state={{ keyword: searchValue }}
                        onClick={handleSearchIconClick}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                </button>
            </div>
            <div
                className={`${
                    showResult
                        ? 'search-result-list-container show'
                        : 'search-result-list-container'
                }`}
            >
                {searchResult.length > 0 &&
                    searchResult.map(song => (
                        <SongItem
                            song={song}
                            key={song.encodeId}
                            onClick={() => handlePlaySong(song)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Search
