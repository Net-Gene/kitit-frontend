import '../styles/Footer.css';

const Footer = () => {
    return (
      <footer class="footer">
        {/* <!--Alatunnisteen sisältösäiliö --> */}
        <div class="footer-content">
            {/* <!--Tekijänoikeusteksti --> */}
            <p>&copy; 2024 Kit-IT Oy. All rights reserved.</p>
            {/* <!--Alatunnisteen navigointilinkit --> */}
            <ul class="footer-links">
            <li><a href="/privacy">Tietosuojakäytäntö</a></li>
            <li><a href="/terms">Palveluehdot</a></li>
            <li><a href="/contact">Ota yhteyttä</a></li>
          </ul>
        </div>
      </footer>

    );
  };
  
  export default Footer;