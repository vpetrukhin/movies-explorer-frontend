import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  
  return (
      <Switch>
        <Route exact path="/">
          <header className="header">
            <Logo />
            <Navigation />
          </header>
        </Route>
        <Route to='/movies'>
          <header className="header">
            <Logo />
            <Navigation />
          </header>
        </Route>
      </Switch>
  )
}
export default Header;