import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import History from './components/pages/History';
import Settings from './components/pages/Settings';

const Layout = () => {
  return (
    <Router>
      <Menu />
      <div id="main-container">
        <Route exact path="/"><Home /></Route>
        <Route exact path="/search"><Search /></Route>
        <Route exact path="/history"><History /></Route>
        <Route exact path="/settings"><Settings /></Route>
      </div>
    </Router>
  );
};

export default Layout;
