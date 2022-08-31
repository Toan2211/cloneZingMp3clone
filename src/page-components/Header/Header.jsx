import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import Search from 'page-components/Search'
Header.propTypes = {}

function Header(props) {
    return (
        <div className="header">
            <Search />
        </div>
    )
}

export default Header
