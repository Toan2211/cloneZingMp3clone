import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import './index.scss'
import audioApi from 'api/audioAPI'
import SongItem from 'page-components/SongItem'
import Section from 'components/Section'
import Item from 'components/Item'
Top100.propTypes = {}

function Top100(props) {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const dataMusic = await audioApi.getTop100()
                setData(dataMusic.data)
                document.title = 'Top 100'
            } catch (err) {
                alert(err)
            }
            setLoading(false)
        })()
    }, [])

    if (isLoading) return <Loading />
    return (
        <div className="top-100-container">
            {data.map((list, index) => (
                <Section key={index} title={list.title}>
                    {list.items.map(item => (
                        <Item data={item} key={item.encodeId} />
                    ))}
                </Section>
            ))}
        </div>
    )
}

export default Top100
