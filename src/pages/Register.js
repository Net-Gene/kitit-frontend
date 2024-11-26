import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        navigate('/'); // Onnistuessa vie login sivulle
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed.'); // Muuten antaa virhe-viestin
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };


    return (
    // Pääsäiliö register-komponentille

    <div class="register">
      
      {/* Otsikko-osio */}
      <div class="register-form">
        <h3>Rekisteröidy</h3>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Uusi Käyttäjänimi" value={username} onChange={(e) => setUsername(e.target.value)} className="register-form-box"/>
        <input type="password" placeholder="Uusi salasana" value={password} onChange={(e) => setPassword(e.target.value)} className="register-form-box"/>
        <input type="password" placeholder="Kirjoita uudelleen uusi salasana" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="register-form-box"/>

        <ul class="register-form-confirm">
            <li>
              <button onClick={handleRegister}>Rekisteröidy</button>
            </li>
        </ul>
        <div class="login-link">
            <p>Onko sinulla jo käyttäjä? </p>
            <a href="/" >Kirjaudu sisään</a>
        </div>
      </div>
    </div>
    );
};

// register-komponentin vieminen käytettäväksi muissa sovelluksen osissa

export default Register;