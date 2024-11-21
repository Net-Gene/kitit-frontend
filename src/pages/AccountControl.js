import React, { useState } from 'react';
import '../styles/AccountControl.css';
import Button from '../components/Button';
import edit_pen_icon from '../assets/edit-pen-icon.png';
import trash_can_icon from '../assets/trash-can-icon.png';
import back_arrow from '../assets/back_arrow.png';

const AccountControl = () => {
  const [username, setUsername] = useState(""); // Ilmoita käyttäjätunnukselle

  const [password, setPassword] = useState(""); // Valitse salasana


  // Käsittele käyttäjänimen syöttämisen muutos

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Käsittele salasanan syöttämisen muutos

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Tallenna käyttäjätunnus

  const handleSave = () => {
    console.log('Käyttäjätunnus tallennettu:', username);
    // Toteuta logiikka käyttäjätunnuksen tallentamiseksi

  };

  // Käsittele salasanan tallentaminen

  const handleSavePassword = () => {
    console.log('Salasana tallennettu:', password);
    // Toteuta salasanan tallennuksen logiikka

  };

  // Hoida tilin poistaminen

  const handleDelete = () => {
    console.log("Tili poistettu");
    // Ota käyttöön tilin poistamisen logiikka

  };

  return (
    <div className="accountControl">
      {/* Takaisin-painike */}
      <div className="back-button">
        <a href="/">
          <img src={back_arrow} alt="back_arrow" className="back_arrow-img" />
        </a>
      </div>
      
      {/* Muokkaa Käyttäjätunnus-osiota */}
      <div className="edit_username_header">
        <h1>Edit Username</h1>
      </div>
      <div className="edit_username_textfield">
        <input 
          type="text" 
          value={username} 
          onChange={handleUsernameChange} 
          placeholder="Anna uusi käyttäjätunnus" 
          className="username-input"
        />
        <img src={edit_pen_icon} alt="edit_pen_icon" className="edit_pen_icon-img" />
      </div>
      <div className="save_username_button">
        <Button onClick={handleSave}>Save Username</Button>
      </div>

      {/* Muokkaa salasana-osiota */}
      <div className="edit_password_header">
        <h1>Edit Password</h1>
      </div>
      <div className="edit_password_textfield">
        <input 
          type="text" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Anna uusi salasana" 
          className="password-input"
        />
        <img src={edit_pen_icon} alt="edit_pen_icon" className="edit_pen_icon-img" />
      </div>
      <div className="save_password_button">
        <Button onClick={handleSavePassword}>Save Password</Button>
      </div>
      
      {/* Tilin poistaminen -osio */}
      <div className="delete_account_button">
        <Button onClick={handleDelete} className="button-red">Delete Account</Button>
        <img src={trash_can_icon} alt="trash_can_icon" className="trash_can_icon-img" />
      </div>
    </div>
  );
};

export default AccountControl;
