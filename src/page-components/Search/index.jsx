import React from 'react';
import PropTypes from 'prop-types';
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
Search.propTypes = {
    
};

function Search(props) {
    return (
        <div className="container-search">
            <div className="search">
                <input
                    className = "search-input"
                    placeholder = "Nhập tên bài hát, nghệ sĩ hoặc MV..."
                />
                <button className="search-btn">
                    <span className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
                </button>
            </div>
        </div>
    );
}

export default Search;