import React, { useState, useEffect } from 'react';
import '../styles/AccountControl.css';
import Button from '../components/Button';
import edit_pen_icon from '../assets/edit-pen-icon.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory

const AccountControl = () => {
  const navigate = useNavigate(); 
  
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [userId, setUserId] = useState("");


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user', {
          withCredentials: true, // Ensure cookies are sent with the request
        });

        alert('API Response:', response.data);

        if (response.status === 200) {
          setUserId(response.data.userId); // Assuming backend sends userId, username, email
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
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
      alert('User not logged in.');
      return;
    }
      try {
        const response = await axios.post('http://localhost:3001/api/update-username', 
          { username: userData.username, userId }
        );

        if (response.status === 200) {
          console.log('Username updated successfully');
        } else {
          console.error('Failed to update username');
        }
      } catch (error) {
        console.error('Error updating username:', error);
      }
  };

  const handleSavePassword = async () => {
    if (!userId) {
      alert('User not logged in.');
      return;
    }
      try {
        const response = await axios.post('http://localhost:3001/api/update-password', 
          { password: userData.password, userId }
        );

      if (response.status === 200) {
        console.log('Password updated successfully');
      } else {
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleSaveEmail = async () => {
    if (!userId) {
      alert('User not logged in.');
      return;
    }
      try {
        const response = await axios.post('http://localhost:3001/api/update-email', 
          { email: userData.email, userId }
        );

      if (response.status === 200) {
        console.log('Email updated successfully');
      } else {
        console.error('Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) {
      alert('User not logged in.');
      return;
    }
      try {
        const response = await axios.delete('http://localhost:3001/api/delete-account', {
          data: { userId }, 
        });
  
      if (response.status === 200) {
        console.log('Account deleted successfully');
        // Navigate to home page after account deletion
        navigate('/');  // Navigate after deleting account
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
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
