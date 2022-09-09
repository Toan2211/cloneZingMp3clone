import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import images from 'assets'
import Menu from 'components/Menu'
import MenuItem from 'components/MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCompactDisc,
    faChartSimple,
    faRadio,
    faMusic,
    faIcons,
    faStar
} from '@fortawesome/free-solid-svg-icons'

function LeftSidebar() {
    const handleonClickItem = () => {}
    return (
        <div className="wrapper_left">
            <Link className="logo logo-lg" to="/">
                <img
                    src={images.logo}
                    alt="logo"
                    className="logo-img"
                />
            </Link>
            <Link className="logo logo-md" to="/">
                <img
                    src = {require('assets/img/logozing.png')}
                    alt="logozing"
                    className="logo-img-md"
                />
            </Link>
            <div className="menu">
                <Menu className="menu">
                    <MenuItem
                        icon={
                            <FontAwesomeIcon icon={faCompactDisc} />
                        }
                        title="Khám Phá"
                        to="/"
                        onClick={handleonClickItem}
                    ></MenuItem>
                    <MenuItem
                        icon={
                            <FontAwesomeIcon icon={faChartSimple} />
                        }
                        title="Bảng Xếp Hạng"
                        to="/chart"
                        onClick={handleonClickItem}
                    ></MenuItem>
                    <MenuItem
                        icon={<FontAwesomeIcon icon={faRadio} />}
                        title="Radio"
                        to="/radio"
                        onClick={handleonClickItem}
                    ></MenuItem>
                    <MenuItem
                        icon={<FontAwesomeIcon icon={faMusic} />}
                        title="Nhạc Mới"
                        to="/newmusic"
                        onClick={handleonClickItem}
                    ></MenuItem>
                    <MenuItem
                        icon={<FontAwesomeIcon icon={faIcons} />}
                        title="Thể loại"
                        to="/category"
                        onClick={handleonClickItem}
                    ></MenuItem>
                    <MenuItem
                        icon={<FontAwesomeIcon icon={faStar} />}
                        title="Top 100"
                        to="/top100"
                        onClick={handleonClickItem}
                    ></MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default LeftSidebar
