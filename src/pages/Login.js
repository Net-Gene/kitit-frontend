import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, ] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password }, { withCredentials: true });
      console.log('Login successful:', response.data);
      navigate('/home'); // Vie kotisivulle onnistuessa
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };


  return (
  // Pääsäiliö login-komponentille

  <div class="login">
    <div class="login-form">
      <h3>Kirjautuminen</h3>
      {error && <p className="error">{error}</p>}
      <input type="text" placeholder="Käyttäjänimi" value={username} onChange={(e) => setUsername(e.target.value)} className="login-form-box"/>
      <input type="password" placeholder="Salasana" value={password} onChange={(e) => setPassword(e.target.value)} className="login-form-box"/>
      <ul class="login-form-confirm">
        <li>
          <button onClick={handleLogin}>Kirjaudu sisään</button>
        </li>
      </ul>
      <div class="register-link">
          <p>Eikö sinulla ole tiliä? </p>
          <a href="/register" >Rekisteröidy</a>
      </div>
    </div>
  </div>
  );
};

// login-komponentin vieminen käytettäväksi muissa sovelluksen osissa

export default Login;