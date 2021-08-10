import React from 'react';

import logo from '../../images/logo.svg';

const Logo = ({ logoClassName }) => {
  
  return (
    <>
      <img className={logoClassName} src={logo} alt="logo"/>
    </>
  )
}
export default Logo;