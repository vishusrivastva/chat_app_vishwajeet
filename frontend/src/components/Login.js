import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data; // Extract user data from response
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
      history.push('/chat')

      props.onLogin(user); // Call onLogin with user data
      history.push('/chat')

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
