import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import BASE_URL from "../../config/config";
import { Link } from "react-router-dom";

const Login = () => {
  // Tilakoukut lomakkeiden syötteiden ja virheiden hallintaan
  const [username, setUsername] = useState(""); // Tallentaaksesi käyttäjänimen syötteen
  const [password, setPassword] = useState(""); // Tallentaaksesi salasanan syöttämisen
  const [error, setError] = useState(""); // Kirjautumisen aikana mahdollisesti ilmestyvien virheilmoitusten tallentamiseen
  const navigate = useNavigate(); // Tämä koukku mahdollistaa ohjelmallisen navigoinnin onnistuneen kirjautumisen jälkeen

  // Käsittele kirjautumistoimintoa (asynkronointitoiminto)
  const handleLogin = async (e) => {
    e.preventDefault(); // Estä lomaketta päivittämästä sivua lähetyksen yhteydessä
    try {
      // POST-pyynnön lähettäminen taustasovellusliittymälle käyttäjän todentamiseksi
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`, // Kirjautumisen päätepiste
        { username, password }, // Käyttäjätunnuksen ja salasanan välittäminen pyynnön rungoksi
        { withCredentials: true }, // Evästeiden (kuten istunto tai JWT-tunnus) sisällyttäminen pyyntöön
      );

      // Kirjaa taustajärjestelmän vastaus onnistuneen kirjautumisen yhteydessä
      console.log("Kirjautuminen onnistui: ", response.data);

      // Siirry kotisivulle onnistuneen kirjautumisen jälkeen
      navigate("/home");
    } catch (error) {
      // Jos tapahtuu virhe (virheelliset tunnistetiedot tai verkkoongelmia), kirjaa virhe ja näytä viesti
      console.error("Kirjautumisvirhe: ", error);

      // Aseta virhetila taustajärjestelmän virhesanomalla tai yleisellä viestillä
      setError(
        error.response?.data?.message || // Jos virhevastaus sisältää viestin, näytä se
          "Kirjautuminen epäonnistui. Yritä uudelleen.", // Yleinen virheilmoitus, jos taustaohjelmasta ei ole erityistä viestiä
      );
    }
  };

  return (
    <div class="login">
      <div class="login-form">
        <h3>Kirjautuminen</h3>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Käyttäjänimi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-form-box"
        />
        <input
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-form-box"
        />

        <div className="login-form-confirm_div">
          <button class="button" onClick={handleLogin}>
            Kirjaudu sisään
          </button>
        </div>

        <div class="register-link">
          <p>Eikö sinulla ole tiliä? </p>
          <Link to="/register">Rekisteröidy</Link>
        </div>
      </div>
    </div>
  );
};

// login-komponentin vieminen käytettäväksi muissa sovelluksen osissa

export default Login;
