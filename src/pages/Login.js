
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, ] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    navigate('/home'); // Onnistuessa vie home sivulle
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