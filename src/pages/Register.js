import React from 'react';
import '../styles/Register.css';

const Register = () => {
    return (
    // Pääsäiliö register-komponentille

    <div class="register">
      
      {/* Otsikko-osio */}
      <div class="register-form">
        <h3>Rekisteröidy</h3>
        <input type="text" name="register-form-box" placeholder="Uusi Käyttäjänimi" class="register-form-box"></input>
        <input type="text" name="register-form-box" placeholder="Uusi salasana" class="register-form-box"></input>
        <input type="text" name="register-form-box" placeholder="Kirjoita uudelleen uusi salasana" class="register-form-box"></input>

        <ul class="register-form-confirm">
            <li><a href="/">Register</a></li>
        </ul>
        <div class="login-link">
            <p>Onko sinulla jo käyttäjä? </p>
            <a href="/" >Kirjaudu sisään</a>
        </div>
      </div>
    </div>
    );
};

// Koti-komponentin vieminen käytettäväksi muissa sovelluksen osissa

export default Register;