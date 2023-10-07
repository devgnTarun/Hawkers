import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
        <nav className='navBar'>
            <div className="logo_nav">
              <img src="" alt="" />
            </div>
            <div className="nav_list">
                <Link to={'/about'}>About Us</Link>
                <Link to={'/becomePartner'}>Become Partner</Link>
            </div>
            <div className="right_nav">
              <Link to={'/login'}>Login</Link>
              <Link to={'/contact'}>Contact</Link>
            </div>
        </nav>
    </>
  )
}

export default Header