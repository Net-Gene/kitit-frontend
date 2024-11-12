import '../styles/Header.css';
import logo from '../assets/Logo.png'
const Header = () => {
    return (
      <header class="header">
        {/* <!--Logokontti --> */}
        <div>
          <img src={logo} alt="logo" class="logo-img">
        </img>
        </div>
        {/* <!--Navigointivalikko --> */}
        <nav class="navbar">
          <ul class="nav-links">
            <li><a href="/">Etusivu</a></li>
            <li><a href="/about">Tietoa meistä</a></li>
            <li><a href="/orderAndAppointment">Tilaus ja ajanvaraus</a></li>
            <li><a href="/services">Palvelut</a></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;