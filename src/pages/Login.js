
import React from 'react';
import '../styles/Login.css';

const Login = () => {
  return (
  // Pääsäiliö login-komponentille

  <div class="login">
    <div class="login-form">
      <h3>Kirjautuminen</h3>
      <input type="text" name="login-form-box" placeholder="Käyttäjänimi" class="login-form-box"></input>
      <input type="text" name="login-form-box" placeholder="Salasana" class="login-form-box"></input>
      <ul class="login-form-confirm">
          <li><a href="/home">Kirjaudu sisään</a></li>
      </ul>
      <div class="register-link">
          <p>Eikö sinulla ole tiliä? </p>
          <a href="/register" >Rekisteröidy</a>
      </div>
    </div>
  </div>
  );
};

// Koti-komponentin vieminen käytettäväksi muissa sovelluksen osissa

export default Login;