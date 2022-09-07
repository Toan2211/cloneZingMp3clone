import React from 'react'
import WeekChartItem from 'page-components/WeekChartItem'
import './index.scss'

function WeekChart({ data, onClick }) {
    const areas = [
        {
            country: 'Việt Nam',
            code: 'vn'
        },
        {
            country: 'US-UK',
            code: 'us'
        },
        {
            country: 'K-Pop',
            code: 'korea'
        }
    ]
    return (
        <div className="week-chart-container">
            <div className="week-chart-content">
                <h3 className="week-chart-title">
                    Bảng xếp hạng tuần
                </h3>
                <div className="week-chart-list">
                    {areas.map((area, index) => (
                        <WeekChartItem
                            key={index}
                            data={data[area.code]}
                            name={area.country}
                            onClick={onClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WeekChart
