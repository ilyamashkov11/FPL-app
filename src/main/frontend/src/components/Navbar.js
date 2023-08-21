import React, {useState} from 'react';
import './Navbar.css';

function Navbar() {
    const [active, setActive] = useState("navMenu");
    const navToggle = () => {
        active === 'navMenu' ? setActive('navMenu nav_active') : setActive('navMenu');
    }
  return (
    <nav className='nav'>
        <div className='logoAndBrand'>
            <h2 className='logo'>logo</h2>
            <a href='#' className='brandName'>FPLWizard</a>
        </div>
        <ul className={active}>
            <li className='nav_item1'>
                <a href='/#' className='homeLink'>Home</a>
            </li>
            <li className='nav_item2'>
                <a href='/#' className='aboutLink'>About</a>
            </li>
            <li className='nav_item3'>
                <a href='https://fantasy.premierleague.com/' target='_blank' className='goToFplLink'>FPL</a>
            </li>
        </ul>
        <div onClick={navToggle} className='nav_toggler'>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='line3'></div>
        </div>
    </nav>
  )
}
export default Navbar
