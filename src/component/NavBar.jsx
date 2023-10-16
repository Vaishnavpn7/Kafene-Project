import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css'

function NavBar() {

    const handleLogout = () => {
        localStorage.removeItem('userSession');
        window.location.href = '/';
      };
  return (
    <div className={classes.navbar}>
      <img src="/logo.png" alt="Kafene Logo" />
      <h1>Kafene</h1>
      <Link to="/orders">
        <button className={classes.navbar_button}>Orders</button>
      </Link>
      <Link to="/products">
        <button className={classes.navbar_button}>Products</button>
      </Link>
      <Link to="/users">
        <button className={classes.navbar_button}>Users</button>
      </Link>
      <button className={classes.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;
