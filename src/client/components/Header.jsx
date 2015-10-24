/** @flow */
import React from 'react';

let Header = (): React.Element => {
  return (
    <nav className="navbar navbar-fixed-top navbar-light bg-faded">
      <a className="navbar-brand" href="#">Navbar</a>
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">Game List</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Vote List</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Github</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;