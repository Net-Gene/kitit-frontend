import React, { useState } from "react";
import "./AccountControl.css";
import Button from "../../components/shared/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate korvaa useHistoryn reitityksessä React Router v6:ssa

import BASE_URL from "../../config/config";
import { Link } from "react-router-dom";
import { useFetchUserId } from "../../hooks/useFetchUser"; // Mukautettu koukku käyttäjätunnuksen hakemiseen

const AccountControl = () => {
  const navigate = useNavigate(); // React Router v6 -koukku ohjelmalliseen navigointiin

  // Tila hallinnoida käyttäjätietoja (käyttäjätunnus, sähköpostiosoite, salasana)
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const userId = useFetchUserId(); // Hanki käyttäjätunnus mukautetusta koukusta

  // Käsittele käyttäjänimen syötteiden muutokset
  const handleUsernameChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      username: event.target.value, // Päivitä käyttäjänimi tilassa
    }));
  };

  // Käsittele sähköpostin syötteiden muutokset
  const handleEmailChange = (event) => {
    setUserData((prevState) => ({ ...prevState, email: event.target.value }));
  };

  // Käsittele salasanan syöttömuutokset
  const handlePasswordChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      password: event.target.value, // Päivitä salasana tilassa
    }));
  };

  // Päivitetyn käyttäjätunnuksen tallentamistoiminto
  const handleSaveUsername = async () => {
    // Tarkista, onko käyttäjä kirjautunut sisään (userId:n pitäisi olla saatavilla)
    if (!userId) {
      alert("Käyttäjä ei ole kirjautunut sisään.");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/update-username`,
        { username: userData.username, userId }, // Lähetä uusi käyttäjätunnus ja käyttäjätunnus taustajärjestelmään
      );

      // Jos vastauksen tila on 200, käyttäjänimen päivitys onnistui
      if (response.status === 200) {
        alert("Käyttäjätunnus päivitetty onnistuneesti");
      } else {
        alert("Käyttäjätunnuksen päivittäminen epäonnistui");
      }
    } catch (error) {
      alert("Virhe päivitettäessä käyttäjätunnusta: " + error); // Virheiden käsittely
    }
  };

  // Päivitetyn salasanan tallennustoiminto
  const handleSavePassword = async () => {
    if (!userId) {
      alert("Käyttäjä ei ole kirjautunut sisään.");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/update-password`,
        { password: userData.password, userId }, // Lähetä uusi salasana ja käyttäjätunnus taustajärjestelmään
      );

      if (response.status === 200) {
        alert("Salasana päivitetty onnistuneesti");
      } else {
        alert("Salasanan päivitys epäonnistui");
      }
    } catch (error) {
      alert("Virhe salasanan päivityksessä: " + error); // Virheiden käsittely
    }
  };

  // Päivitetyn sähköpostin tallentamistoiminto
  const handleSaveEmail = async () => {
    if (!userId) {
      alert("Käyttäjä ei ole kirjautunut sisään.");
      return;
    }

    // Sähköpostin perusvahvistus säännöllisellä lausekkeella (säännöllinen lauseke)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(userData.email)) {
      // Tarkista, vastaako sähköposti säännöllistä lauseketta
      alert("Sähköposti ei ole kelvollisessa muodossa.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/user/update-email`, {
        email: userData.email,
        userId,
      });

      if (response.status === 200) {
        alert("Sähköpostin päivitys onnistui");
      } else {
        alert("Sähköpostin päivittäminen epäonnistui");
      }
    } catch (error) {
      alert("Virhe päivitettäessä sähköpostia: " + error); // Virheiden käsittely
    }
  };

  // Evästeiden tyhjennystoiminto (uloskirjautuminen)
  const clearCookie = async () => {
    try {
      // Lähetä pyyntö evästeiden poistamiseksi palvelimelta
      await axios.post(
        `${BASE_URL}/api/auth/clearCookie`,
        {},
        { withCredentials: true }, // Varmistaa, että evästeet lähetetään pyynnön mukana
      );

      alert('"Cookies" tyhjennetty onnistuneesti!');
      navigate("/"); // Siirry takaisin kirjautumissivulle evästeiden poistamisen jälkeen
    } catch (error) {
      alert(
        `Virhe "Cookies" tyhjennyksessä : ${
          error.response?.data?.message || error.message
        }`, // Anna yksityiskohtainen virheilmoitus
      );
    }
  };

  // Toiminto käyttäjätilin poistamiseksi
  const handleDeleteAccount = async () => {
    if (!userId) {
      alert("Käyttäjä ei ole kirjautunut sisään.");
      return;
    }
    try {
      // Lähetä poistopyyntö taustajärjestelmään
      const response = await axios.delete(
        `${BASE_URL}/api/user/delete-account`,
        {
          data: { userId }, // Lähetä käyttäjätunnus tilin poistamiseksi
        },
      );

      if (response.status === 200) {
        alert("Tilin poistaminen onnistui");
        clearCookie(); // Tyhjennä evästeet tilin poistamisen jälkeen
      } else {
        alert("Tilin poistaminen epäonnistui");
      }
    } catch (error) {
      alert("Virhe poistettaessa tiliä: " + error); // Virheiden käsittely
    }
  };

  return (
    <div className="accountControl">
      <Link to="/home">
        <button className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </Link>

      <div className="edit_username_header">
        <h1>Edit Username</h1>
      </div>
      <div className="edit_username_textfield">
        <input
          type="text"
          value={userData.username}
          onChange={handleUsernameChange}
          placeholder="Enter new username"
          className="username-input"
        />
        <div className="edit-pen-icon-div">
          <i class="fa-solid fa-user-pen"></i>
        </div>
      </div>
      <div className="save_username_button">
        <Button onClick={handleSaveUsername} className="button">
          Save Username
        </Button>
      </div>

      <div className="edit_password_header">
        <h1>Edit Password</h1>
      </div>
      <div className="edit_password_textfield">
        <input
          type="password"
          value={userData.password}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
          className="password-input"
        />
        <div className="edit-pen-icon-div">
          <i class="fa-solid fa-user-pen"></i>
        </div>
      </div>
      <div className="save_password_button">
        <Button onClick={handleSavePassword} className="button">
          Save Password
        </Button>
      </div>

      <div className="edit_email_header">
        <h1>Edit Email</h1>
      </div>
      <div className="edit_email_textfield">
        <input
          type="email"
          value={userData.email}
          onChange={handleEmailChange}
          placeholder="Enter new email"
          className="email-input"
        />
        <div className="edit-pen-icon-div">
          <i class="fa-solid fa-user-pen"></i>
        </div>
      </div>
      <div className="save_email_button">
        <Button onClick={handleSaveEmail} className="button">
          Save Email
        </Button>
      </div>

      <div className="delete_account_button_div">
        <Button onClick={handleDeleteAccount} className="red-button">
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default AccountControl;
