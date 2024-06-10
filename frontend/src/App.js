import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {loggedIn ? <Redirect to="/chat" /> : <Login  />}
        </Route>
        <Route path="/register">
          {loggedIn ? <Redirect to="/chat" /> : <Register />}
        </Route>
        <Route path="/chat">
          {loggedIn ? <Chat  /> : <Redirect to="/login" />}
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
