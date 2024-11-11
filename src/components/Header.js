import '../styles/Header.css';
import '../assets/Logo.png'
const Header = () => {
    return (
      <header class="header">
        {/* <!--Logokontti --> */}
        <div class="logo">
          {/* <img src="Logo.png" alt="Logo" class="logo-img"> */}
        </div>
        {/* <!--Navigointivalikko --> */}
        <nav class="navbar">
          <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/accountControl">Account Control</a></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;