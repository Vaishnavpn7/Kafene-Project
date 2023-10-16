import React, { useState } from 'react';
import classes from './Login.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === password) {
      // Correct credentials, set the user as logged in
      localStorage.setItem('userSession', 'loggedIn');
      alert('Login Successful');

      // Redirect to the Orders page using React Router
      // Replace '/orders' with your actual route
      window.location.href = '/orders';
    } else {
      alert('Please enter valid credentials!');
    }
  };

  return (
    <div className={classes.login_page}>
      <h1>Login !</h1>
      <div className={classes.login_form}>
        <input
          className={classes.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={classes.login_button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
