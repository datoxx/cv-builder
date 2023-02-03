import React from 'react'
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

function  Home() {
  return (
    <div> 
      <header>
        <img src={logo} alt='logo' />
      </header>

      <Link  to="/general-information" >general-information </Link>
    </div>
  )
}

export default  Home


