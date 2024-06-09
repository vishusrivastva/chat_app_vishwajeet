import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = (user) => {
    setLoggedIn(true);
    setSnackbarOpen(true);
    setSnackbarMessage(`Welcome back, ${user.name}!`);
    useHistory
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {loggedIn ? <Redirect to="/chat" /> : <Login onLogin={() =>handleLogin} />}
        </Route>
        <Route path="/register">
          {loggedIn ? <Redirect to="/chat" /> : <Register />}
        </Route>
        <Route path="/chat">
          {loggedIn ? <Chat onLogout={handleLogout} /> : <Redirect to="/login" />}
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Router>
  );
};

export default App;
