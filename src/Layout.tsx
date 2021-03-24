import React, { useState } from 'react';
import Menu from './components/Menu';
import Search from './components/pages/Search';
import History from './components/pages/History';
import { MenuItem } from './models/Enums';

const Layout = () => {

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem>(MenuItem.search);
  const onMenuItemSelect = (selectedMenuItem: MenuItem) => {
    setSelectedMenuItem(selectedMenuItem);
  };

  return (
    <>
      <Menu
        selectedMenuItem={selectedMenuItem}
        onMenuItemSelect={onMenuItemSelect}
      />
      <div id="main-container">
        {selectedMenuItem == MenuItem.search ? <Search /> : null}
        {selectedMenuItem == MenuItem.history ? (
          <History />
        ) : null}
      </div>
    </>
  );
};

export default Layout;
