import React from 'react'
import './index.scss'
import Header from 'page-components/Header/Header'
import LeftSidebar from 'page-components/LeftSidebar/LeftSidebar'
import RightSidebar from 'page-components/RightSidebar'
import Player from 'page-components/Player'

function MainLayout(props) {
    const { children } = props
    return (
        <div className="wrapper">
            <div className="container-mainLayout">
                <div className="left-side">
                    <LeftSidebar />
                </div>

                <div className="content">
                    <Header />
                    <div className="page">{children}</div>
                </div>

                <div className="right-side">
                    <RightSidebar />
                </div>
            </div>
            <Player />
        </div>
    )
}

export default MainLayout
