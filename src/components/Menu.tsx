import React from 'react';
import { MenuItem } from '../models/Enums';

interface MenuProps {
  selectedMenuItem: MenuItem;
  onMenuItemSelect: (selectedMenuItem: MenuItem) => any;
}

const Menu: React.FC<MenuProps> = ({ selectedMenuItem, onMenuItemSelect }) => {
  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <button
          onClick={() => onMenuItemSelect(MenuItem.search)}
          className={`btn btn-link nav-link menu-nav-item ${
            selectedMenuItem == MenuItem.search ? 'active-nav-link' : ''
          }`}
          title="Търсачка"
        >
          🔎
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => onMenuItemSelect(MenuItem.history)}
          className={`btn btn-link nav-link menu-nav-item ${
            selectedMenuItem == MenuItem.history ? 'active-nav-link' : ''
          }`}
          title="История"
        >
          📝
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => onMenuItemSelect(MenuItem.settings)}
          className={`btn btn-link nav-link menu-nav-item ${
            selectedMenuItem == MenuItem.settings ? 'active-nav-link' : ''
          }`}
          title="Настройки"
        >
          ⚙
        </button>
      </li>
    </ul>
  );
};

export default Menu;
