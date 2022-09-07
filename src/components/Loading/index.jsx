import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

function Loading() {
    return (
        <div className="container-loading">
            <FontAwesomeIcon
                icon={faSpinner}
                className="loading-icon"
            />
        </div>
    )
}

export default Loading
