import React from 'react'
import { Link } from 'react-router-dom'
import SongItem from 'page-components/SongItem'
import './index.scss'
import { useDispatch } from 'react-redux'

function WeekChartItem({ data, name, onClick }) {
    const dispatch = useDispatch()
    const dataShow = data.items.slice(0, 5)
    return (
        <div className="week-chart-item-container">
            <div className="week-chart-item-content">
                <div className="week-chart-item-content__header">
                    <Link
                        className="week-chart-item-content__header-link"
                        to={data.link}
                        state={{ id: data.playlistId }}
                    >
                        {name}
                    </Link>
                </div>
                <div className="week-chart-item-content__list-song">
                    {dataShow.map((item, index) => (
                        <SongItem
                            key={item.encodeId}
                            serial={true}
                            index={index}
                            song={item}
                            type="mini"
                            onClick={() =>
                                onClick(
                                    item,
                                    data.items,
                                    data.playlistId,
                                    dispatch
                                )
                            }
                        />
                    ))}
                </div>
                <button className="week-chart-item-btn">
                    <Link
                        className="week-chart-item-content__link-btn"
                        to={data.link}
                        state={{ id: data.playlistId }}
                    >
                        Tất cả
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default WeekChartItem
