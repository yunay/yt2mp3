import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item"><Link className="nav-link" to="/" title="Начало">🏡</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/search" title="Търсачка">🎬</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/history" title="История">📝</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/settings" title="Настройки">⚙</Link></li>
    </ul>
  );
};

export default Menu;
