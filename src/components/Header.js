import '../styles/Header.css';
import logo from '../assets/Logo.png'
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function


  const logOut = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/clearCookie', {}, { withCredentials: true })
      alert('Kirjauduttu ulos onnistuneesti!');
      navigate('/'); // Use navigate to redirect to the login page
    } catch (error) {
      alert(`Virhe kirjautumisessa ulos: ${error.response?.data?.message || error.message}`);
    }
  };

  

  return (
    <header className="header">
      {/* Logo ja Kirjaudu Ulos ryhmiteltynä */}
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
        <Button onClick={logOut} className="button">
          <i className="fas fa-sign-out-alt"></i> Kirjaudu Ulos
        </Button>
      </div>

      {/* Navigointivalikko */}
        <nav class="navbar">
          <ul class="nav-links">
            <li><a href="/home">Etusivu</a></li>
            <li><a href="/about">Tietoa meistä</a></li>
            <li><a href="/orderAppointments">Tee ajanvaraus</a></li>
            <li><a href="/services">Palvelut</a></li>
            <li><a href="/shoppingCart"><span class="icon">&#128722;</span></a></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;