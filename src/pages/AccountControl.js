import React, { useState } from 'react';

import '../styles/AccountControl.css';

import Button from '../components/Button';
import blank_user_image from '../assets/blank user.png';
import edit_pen_icon from '../assets/edit-pen-icon.png';
import trash_can_icon from '../assets/trash-can-icon.png';
import back_arrow from '../assets/back_arrow.png';

const AccountControl = () => {

  const [username, setUsername] = useState(""); // State username arvon talletukseen

  // input muutos handler
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const [password, setPassword] = useState(""); // State password arvon talletukseen

  // input muutos handler
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    // Tilinhallinta sivu
    <div class ="accountControl">

      {/*Takaisin nappi*/}
      <div class ="back-button">
        {/*Linkki pääsivulle, jossa on nuolikuvake*/}
        <a href="/home">
          <img src={back_arrow} alt="back_arrow" class="back_arrow-img"></img>
        </a>
      </div>
      
      {/*Käyttäjänimen edit osio*/}
      <div class ="edit_username_header">
        <h1>
          Edit Username
        </h1>
      </div>
      <div class ="edit_username_textfield">
        {/*Tekstikenttä*/}
        <input 
          type="text" 
          value={username} 
          onChange={handleUsernameChange} 
          placeholder="Enter new username" 
          className="username-input"
        />
        <img src={edit_pen_icon} alt="edit_pen_icon" class="edit_pen_icon-img"></img>
      </div>
      <div class ="save_username_button">
        {/*Käyttäjänimen tallennus nappi*/}
        <Button onClick={handleSave/* Todo logiikka*/}>Save Username</Button>
      </div>

      {/*Salasanan edit osio*/}
      <div class ="edit_password_header">
        <h1>
          Edit Password
        </h1>
      </div>
      <div class ="edit_password_textfield">
        {/*Tekstikenttä*/}
        <input 
          type="text" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Enter new password" 
          className="password-input"
        />
        <img src={edit_pen_icon} alt="edit_pen_icon" class="edit_pen_icon-img"></img>
      </div>
      <div class ="save_password_button">
        {/*Salasanan tallennus nappi*/}
        <Button onClick={handleSave/* Todo logiikka*/}>Save Password</Button>
      </div>
      
      {/*Käyttäjän poisto osio*/}
      <div class ="delete_account_button">
        {/*Käyttäjän poisto nappi*/}
        <Button onClick={handleDelete/* Todo logiikka*/} className="button-red">Delete Account</Button>
        <img src={trash_can_icon} alt="trash_can_icon" class="trash_can_icon-img"></img>
      </div>

    </div>

  );
};

export default AccountControl;