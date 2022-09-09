import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './index.scss'

function Item(props) {
    const { data, type } = props
    return (
        <div
            className={`${
                type === 'topic' ? 'col-3 col-xs-6 col-md-3 ' : 'col-2-4 col-xs-6 col-md-3 '
            }item`}
        >
            <div
                className={`${
                    type === 'topic' ? 'topic ' : ''
                }item-thumbnail`}
            >
                <Link
                    className="item-action"
                    to={data.link}
                    state={{ id: data.encodeId }}
                >
                    {type === 'topic' ? (
                        ''
                    ) : (
                        <FontAwesomeIcon icon={faCirclePlay} />
                    )}
                </Link>
                <img
                    src={data.thumbnailM || data.thumbnailHasText}
                    alt={data.sortDescription}
                    className="item-img"
                />
            </div>
            {type === 'topic' ? (
                ''
            ) : (
                <div className="item-info">
                    <Link
                        className="item-info-title"
                        to={data.link}
                        state={{ id: data.encodeId }}
                    >
                        <h3 className="item-info-title">
                            {data.title}
                        </h3>
                    </Link>
                    {data.sortDescription && (
                        <p className="item-info-description">
                            {data.sortDescription}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Item
