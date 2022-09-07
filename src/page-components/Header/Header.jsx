import React, { useState } from 'react'
import './index.scss'
import Search from 'page-components/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faChartSimple,
    faCompactDisc,
    faIcons,
    faMusic,
    faRadio,
    faStar
} from '@fortawesome/free-solid-svg-icons'
import Menu from 'components/Menu'
import MenuItem from 'components/MenuItem'

function Header() {
    const [menuShow, setMenuShow] = useState(false)
    const toggleMenu = () => setMenuShow(!menuShow)
    const handleonClickItem = () => {
        setMenuShow(false)
    }

    return (
        <div className="header">
            <div className="menu-mobile">
                <div className="menu-mobile-btn">
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={toggleMenu}
                    />
                </div>
                <div
                    className={`${
                        menuShow
                            ? 'menu-mobile-listmenu display'
                            : 'menu-mobile-listmenu'
                    }`}
                >
                    <Menu className="menu">
                        <MenuItem
                            icon={
                                <FontAwesomeIcon
                                    icon={faCompactDisc}
                                />
                            }
                            title="Khám Phá"
                            to="/"
                            onClick={handleonClickItem}
                        ></MenuItem>
                        <MenuItem
                            icon={
                                <FontAwesomeIcon
                                    icon={faChartSimple}
                                />
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
            <Search />
        </div>
    )
}

export default Header
