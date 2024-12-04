import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';
import BASE_URL from '../components/config'; 

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, { username, password }, { withCredentials: true });
      alert('Rekisteröityminen onnistui!');
      navigate('/'); // Vie login sivulle onnistuessa
    } catch (error) {
      alert('Rekisteröinnin aikana tapahtui virhe.');
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Rekisteröinnin aikana tapahtui virhe.');
    }
  };


    return (
    // Pääsäiliö register-komponentille

    <div class="register">
      
      {/* Otsikko-osio */}
      <div class="register-form">
        <h3>Rekisteröidy</h3>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Uusi Käyttäjänimi" value={username} onChange={(e) => setUsername(e.target.value)} className="register-form-box" name="username"/>
        <input type="password" placeholder="Uusi salasana" value={password} onChange={(e) => setPassword(e.target.value)} className="register-form-box" name="password"/>
        <input type="password" placeholder="Kirjoita uudelleen uusi salasana"
        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="register-form-box" name="confirmPassword"/>
        <button class="register-form-confirm" onClick={handleRegister}>Rekisteröidy</button>
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