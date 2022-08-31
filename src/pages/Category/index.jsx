import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import audioApi from 'api/audioAPI'
import Loading from 'components/Loading'
import Section from 'components/Section'
import Item from 'components/Item'
import './index.scss'
Category.propTypes = {

}

function Category(props) {
    const [data, setData] = useState([])
    const [topic, setTopic] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [contentBtn, setContentBtn] = useState('Tất cả')
    const [isFullTopic, setIsFullTopic] = useState(false)
    const handleExpand = () => {
        if (isFullTopic) {
            setContentBtn('Tất cả')
            setIsFullTopic(false)
            setTopic(data.topic.slice(0, 4))
        }
        else {
            setContentBtn('Thu gọn')
            setIsFullTopic(true)
            setTopic(data.topic)
        }
    }
    useEffect(() => {
        (
            async () => {
                const dataFromServer = await audioApi.getCategoryData()
                setData(dataFromServer.data)
                setLoading(false)
                setTopic(dataFromServer.data.topic.slice(0, 4))
                document.title = 'Category'
            }
        )()
    }, [])

    if (isLoading) return <Loading />
    console.log(topic)
    return (
        <div className="category-container">
            <div className="category-topic">
                {
                    <Section key = {1} title = {'Tâm Trạng Và Hoạt Động'} canFull = {isFullTopic ? true : false}>
                        {
                            topic.map((itemTopic) => (
                                <Item data = {itemTopic} key = {itemTopic.encodeId} type = "topic"/>
                            ))
                        }
                    </Section>
                }
                <button className="expand-button" onClick={handleExpand}>
                    {contentBtn}
                </button>
            </div>
            <div className="genre">
                {
                    data.genre.map((section) => (
                        <Section key={section.encodeId} title = {section.title} btn = {true} data= {section} >
                            {
                                section.playlists.map((playlist) => (
                                    <Item key = {playlist.encodeId} data = {playlist}/>
                                ))
                            }
                        </Section>
                    ))
                }
            </div>
        </div>
    )
}

export default Category