import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'

Radio.propTypes = {}

function Radio(props) {
    useEffect(() => {
        document.title = 'Radio'
    }, [])
    const [isLoading, setLoading] = useState(true)
    if (isLoading) return <Loading />
    return <div></div>
}

export default Radio
