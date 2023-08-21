import React from 'react'
import {FaSearch} from 'react-icons/fa'
import './Searchbar.css'

function Searchbar() {
  return (
    <div className='container'>
        <div className='bar'>
            <FaSearch className='searchIcon' />
            <input className='searchInput' placeholder='Type Your Name...'/>
        </div>
        <div className='results'>search bar results</div>
    </div>
  )
}

export default Searchbar