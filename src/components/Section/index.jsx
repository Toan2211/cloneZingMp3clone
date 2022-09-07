import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function Section(props) {
    const { children, title, btn, data, canFull } = props
    return (
        <div className="section-container container">
            <div className="section-header">
                <h3 className="section-header-title">
                    {title || 'Playlist/Album'}
                </h3>
                {btn && (
                    <Link
                        to={data.link}
                        state={{ id: data.encodeId }}
                        className="category-link"
                    >
                        <span>Tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                )}
            </div>
            <div
                className={`${
                    canFull ? 'list-full-topic ' : 'section-list '
                }row`}
            >
                {children}
            </div>
        </div>
    )
}

export default Section
