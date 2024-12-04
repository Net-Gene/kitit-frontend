import React, { useState, useEffect } from 'react';
import '../styles/AccountControl.css';
import Button from '../components/Button';
import edit_pen_icon from '../assets/edit-pen-icon.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigoi useHistoryn tapahtuma
import BASE_URL from '../components/config'; 



const AccountControl = () => {
  const navigate = useNavigate(); 
  
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [userId, setUserId] = useState("");


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/auth/check-auth-token`, {
          withCredentials: true, // Varmista, että evästeet lähetetään pyynnön mukana


        });


        if (response.status === 200) {
          setUserId(response.data.userId); // Olettaen, että taustajärjestelmä lähettää käyttäjätunnuksen, käyttäjätunnuksen, sähköpostin


        } else {
          alert('Käyttäjätietojen nouto epäonnistui');
        }
      } catch (error) {
        alert('Virhe haettaessa käyttäjätietoja: '+ error);
      }
    };

    fetchUserData();
  }, []);

  const handleUsernameChange = (event) => {
    setUserData((prevState) => ({ ...prevState, username: event.target.value }));
  };

  const handleEmailChange = (event) => {
    setUserData((prevState) => ({ ...prevState, email: event.target.value }));
  };

  const handlePasswordChange = (event) => {
    setUserData((prevState) => ({ ...prevState, password: event.target.value }));
  };

  const handleSaveUsername = async () => {
    if (!userId) {
      alert('Käyttäjä ei ole kirjautunut sisään.');
      return;
    }
      try {
        const response = await axios.post(`${BASE_URL}/api/auth/update-username`, 
          { username: userData.username, userId }
        );

        if (response.status === 200) {
          alert('Käyttäjätunnus päivitetty onnistuneesti');
        } else {
          alert('Käyttäjätunnuksen päivittäminen epäonnistui');
        }
      } catch (error) {
        alert('Virhe päivitettäessä käyttäjätunnusta: ' + error);
      }
  };

  const handleSavePassword = async () => {
    if (!userId) {
      alert('Käyttäjä ei ole kirjautunut sisään.');
      return;
    }
      try {
        const response = await axios.post(`${BASE_URL}/api/user/update-password`, 
          { password: userData.password, userId }
        );

      if (response.status === 200) {
        alert('Salasana päivitetty onnistuneesti');
      } else {
        alert('Salasanan päivitys epäonnistui');
      }
    } catch (error) {
      alert('Virhe salasanan päivityksessä: ' + error);
    }
  };

  const handleSaveEmail = async () => {
    if (!userId) {
      alert('Käyttäjä ei ole kirjautunut sisään.');
      return;
    }
  
    // Vahvista sähköpostin muoto käyttämällä yksinkertaista regex-mallia

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(userData.email)) {
      alert('Sähköposti ei ole kelvollisessa muodossa.');
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/api/user/update-email`, 
        { email: userData.email, userId }
      );
  
      if (response.status === 200) {
        alert('Sähköpostin päivitys onnistui');
      } else {
        alert('Sähköpostin päivittäminen epäonnistui');
      }
    } catch (error) {
      alert('Virhe päivitettäessä sähköpostia: '+ error);
    }
  };
  
  const clearCookie = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/clearCookie`, {}, { withCredentials: true })

      alert('"Cookies" tyhjennetty onnistuneesti!');
      navigate('/'); // Käytä navigointia ohjataksesi kirjautumissivulle


    } catch (error) {
      alert(`Virhe "Cookies" tyhjennyksessä : ${error.response?.data?.message || error.message}`);
    }
  };
  const handleDeleteAccount = async () => {
    if (!userId) {
      alert('Käyttäjä ei ole kirjautunut sisään.');
      return;
    }
      try {
        const response = await axios.delete(`${BASE_URL}/api/user/delete-account`, {
          data: { userId }, 
        });
  
      if (response.status === 200) {
        alert('Tilin poistaminen onnistui');
        // Siirry kotisivulle tilin poistamisen jälkeen


        clearCookie();

      } else {
        alert('Tilin poistaminen epäonnistui');
      }
    } catch (error) {
      alert('Virhe poistettaessa tiliä: '+ error);
    }
  };

  return (
    <div className="accountControl">
      <div className="back-button"><a href="/home"><button className="back-btn"><i className="fa-solid fa-arrow-left"></i></button></a></div>

      <div className="edit_username_header"><h1>Edit Username</h1></div>
      <div className="edit_username_textfield">
        <input 
          type="text" 
          value={userData.username} 
          onChange={handleUsernameChange} 
          placeholder="Enter new username" 
          className="username-input"
        />
        <img src={edit_pen_icon} alt="edit_pen_icon" className="edit_pen_icon-img" />
      </div>
      <div className="save_username_button">
        <Button onClick={handleSaveUsername} className="button-save">Save Username</Button>
      </div>

      <div className="edit_password_header"><h1>Edit Password</h1></div>
      <div className="edit_password_textfield">
        <input 
          type="password" 
          value={userData.password} 
          onChange={handlePasswordChange} 
          placeholder="Enter new password" 
          className="password-input"
        />
        <img src={edit_pen_icon} alt="edit_pen_icon" className="edit_pen_icon-img" />
      </div>
      <div className="save_password_button">
        <Button onClick={handleSavePassword} className="button-save">Save Password</Button>
      </div>

      <div className="edit_email_header"><h1>Edit Email</h1></div>
      <div className="edit_email_textfield">
        <input 
          type="email" 
          value={userData.email} 
          onChange={handleEmailChange} 
          placeholder="Enter new email" 
          className="email-input"
        />
        <img src={edit_pen_icon} alt="edit_pen_icon" className="edit_pen_icon-img" />
      </div>
      <div className="save_email_button">
        <Button onClick={handleSaveEmail} className="button-save">Save Email</Button>
      </div>

      <div className="delete_account_button">
        <Button onClick={handleDeleteAccount} className="button-red">Delete Account</Button>
      </div>
    </div>
  );
};

export default AccountControl;
