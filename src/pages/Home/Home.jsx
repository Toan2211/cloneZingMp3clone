import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import audioApi from 'api/audioAPI'
import Section from 'components/Section'
import Item from 'components/Item'

Home.propTypes = {}

function Home(props) {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const result = await audioApi.getHomeData()
                setData(result.data.items)
                document.title = 'Home'
                setLoading(false)
            }
            catch (err) {
                alert(err)
            }
        })()
    }, [])
    if (isLoading) return <Loading />
    console.log(data)
    return (
        <div className="home-container">
            {
                data.filter(item => item.sectionType === 'playlist').map((item, index) => (
                    <Section key={index} title = {item.title}>
                        {
                            item.items.map((itemPlayist) => (
                                <Item data = {itemPlayist} key = {itemPlayist.encodeId}/>
                            ))
                        }
                    </Section>
                ))
            }
        </div>
    )
}

export default Home
