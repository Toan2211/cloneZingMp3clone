import React from 'react'

function Menu(props) {
    const { className, children } = props
    return <nav className={className}>{children}</nav>
}

export default Menu
