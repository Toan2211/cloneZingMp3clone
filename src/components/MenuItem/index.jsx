import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'
import './index.scss'
MenuItem.propTypes = {
    
};

function MenuItem(props) {
    const { icon, title, to, onClick } = props
    return (    
        <NavLink
            onClick={onClick}
            to = {to}
            className={(nav) => {
                return `${nav.isActive ? 'isActive ' : ''}menu-item`
            }}
        >
            <span className="menu-item__icon">{icon}</span>
            <span className="menu-item__title">{title}</span>
        </NavLink>
    );
}

export default MenuItem