import React, { useEffect, useState } from 'react'
import './index.scss'
import { useLocation } from 'react-router-dom'
import audioApi from 'api/audioAPI'
import Loading from 'components/Loading'
import Section from 'components/Section'
import Item from 'components/Item'

function DetailCategory() {
    const location = useLocation()
    const { id } = location.state
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        (async () => {
            const dataFromServer = await audioApi.getCategoryDetail(
                id
            )
            setData(dataFromServer.data)
            setIsLoading(false)
        })()
    }, [id])
    if (isLoading) return <Loading />
    return (
        <div className="detailCategory-container">
            <div className="detailCategory-banner">
                <img
                    src={data.cover}
                    alt={data.encodeId}
                    className="detailCategory-banner-img"
                />
            </div>
            <div className="detailCategory-content">
                {data.sections
                    .filter(item => item.sectionType === 'playlist')
                    .map((section, index) => (
                        <Section key={index} title={section.title}>
                            {section.items.map(item => (
                                <Item
                                    key={item.encodeId}
                                    data={item}
                                />
                            ))}
                        </Section>
                    ))}
            </div>
        </div>
    )
}

export default DetailCategory
