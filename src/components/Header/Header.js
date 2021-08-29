import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = () => {

  return (
    <Switch>
      <Route path="/signup">
        <header></header>
      </Route>
      <Route path="/signin">
        <header></header>
      </Route>
      <Route exact path="/">
        <header className="header">
          <Logo />
          <Navigation />
        </header>
      </Route>
      <Route exact path="/movies">
        <header className="header">
          <Logo />
          <Navigation />
        </header>
      </Route>
      <Route exact path="/saved-movies">
        <header className="header">
          <Logo />
          <Navigation />
        </header>
      </Route>
      <Route exact path="/profile">
        <header className="header">
          <Logo />
          <Navigation />
        </header>
      </Route>
      <Route path="*">
        <header></header>
      </Route>
    </Switch>
  );
}
export default Header;