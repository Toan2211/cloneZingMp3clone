import React from 'react';
import PropTypes from 'prop-types';

Menu.propTypes = {
    
}

function Menu(props) {
    const { className, children } = props
    return <nav className={className}>{children}</nav>
}

export default Menu