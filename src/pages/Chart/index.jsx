import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'

Chart.propTypes = {}

function Chart(props) {
    useEffect(() => {
        document.title = 'Chart'
    }, [])
    const [isLoading, setLoading] = useState(true)
    if (isLoading) return <Loading />
    return <div></div>
}

export default Chart
