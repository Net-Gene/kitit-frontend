import "./Header.css";
import logo from "../../../assets/Logo.png";
import axios from "axios";
import Button from "../../shared/Button";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from "../../../config/config";

const Header = () => {
  const navigate = useNavigate(); // Alusta navigointitoiminto

  const logOut = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/clearCookie`,
        {},
        { withCredentials: true },
      );

      alert("Kirjauduttu ulos onnistuneesti!");
      navigate("/"); // Käytä navigointia ohjataksesi kirjautumissivulle
    } catch (error) {
      alert(
        `Virhe kirjautumisessa ulos: ${error.response?.data?.message || error.message}`,
      );
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
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/home">Etusivu</Link>
          </li>
          <li>
            <Link to="/about">Tietoa meistä</Link>
          </li>
          <li>
            <Link to="/orderAppointments">Tee ajanvaraus</Link>
          </li>
          <li>
            <Link to="/services">Palvelut</Link>
          </li>
          <li>
            <Link to="/shoppingCart">
              <span className="header-icon">
                <i class="fa-solid fa-cart-shopping"></i>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
