import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import BASE_URL from "../../config/config"; // Tämä viittaa ympäristömuuttujaan, joka määrittää API-pohjan URL-osoitteen
import { Link } from "react-router-dom";

const Register = () => {
  // useState hookien käyttö komponentin tilan hallintaan
  const [username, setUsername] = useState(""); // Käyttäjätunnuksen tallentaminen
  const [password, setPassword] = useState(""); // Salasanan tallentaminen
  const [confirmPassword, setConfirmPassword] = useState(""); // Vahvistus salasanan tallentaminen
  const [error, setError] = useState(""); // Mahdollisten virheiden tallentaminen
  const navigate = useNavigate(); // Navigointiin tarvittava hook, jotta voidaan siirtyä muihin sivuihin

  // Rekisteröintilomakkeen käsittely
  const handleRegister = async (e) => {
    e.preventDefault(); // Estetään lomakkeen oletustoiminto (sivun lataus)

    // Tarkistetaan, että kaikki kentät on täytetty
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Vahvistetaan, että salasanat täsmäävät
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Yritetään tehdä rekisteröintipyyntö palvelimelle
    try {
      await axios.post(
        `${BASE_URL}/api/auth/register`, // Käytetään määriteltyä BASE_URL-osoitetta ja lisätään oikea API-polku
        { username, password }, // Lähetetään käyttäjätunnus ja salasana rekisteröinnin tiedoiksi
        { withCredentials: true }, // Lähetetään evästeet mukaan, jos se on tarpeen
      );
      alert("Rekisteröityminen onnistui!");
      navigate("/"); // Siirrytään kirjautumissivulle onnistuneen rekisteröinnin jälkeen
    } catch (error) {
      // Virheen käsittely, jos rekisteröinti epäonnistuu
      alert("Rekisteröinnin aikana tapahtui virhe.");
      console.error("Registration error:", error); // Virheiden tarkempaa tulostamista konsoliin
      setError(
        error.response?.data?.message || // Jos virheestä on tarkempaa viestiä, näytetään se
          "Rekisteröinnin aikana tapahtui virhe.", // Muuten näytetään yleinen virheviesti
      );
    }
  };

  return (
    <div class="register">
      {/* Otsikko osio */}
      <div class="register-form">
        <h3>Rekisteröidy</h3>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Uusi Käyttäjänimi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-form-box"
          name="username"
        />
        <input
          type="password"
          placeholder="Uusi salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-form-box"
          name="password"
        />
        <input
          type="password"
          placeholder="Kirjoita uudelleen uusi salasana"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-form-box"
          name="confirmPassword"
        />
        <div className="register-form-confirm-div">
          <button class="button" onClick={handleRegister}>
            Rekisteröidy
          </button>
        </div>
        <div class="login-link">
          <p>Onko sinulla jo käyttäjä? </p>
          <Link to="/">Kirjaudu sisään</Link>
        </div>
      </div>
    </div>
  );
};

// register-komponentin vieminen käytettäväksi muissa sovelluksen osissa

export default Register;
