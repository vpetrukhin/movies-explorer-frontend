import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

const Logo = ({ logoClassName }) => {
  
  return (
    <Link to="/">
      <img className={logoClassName} src={logo} alt="logo"/>
    </Link>
  )
}
export default Logo;