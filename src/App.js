import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Tuodaan komponentteja sivuille ja ylä-/alatunnisteelle
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import AccountControl from './pages/AccountControl';
import Header from './components/Header';
import Footer from './components/Footer';

// Tuodaan alatunnisteen tyylit
import './styles/Footer.css';

function App() {
  // Tila, jossa haetut tiedot säilytetään (ei tällä hetkellä käytössä)
  const [, setData] = useState(null);

  // useEffect hook noutaa tietoja palvelimelta, kun komponentti on asennettu
  useEffect(() => {
    fetch('http://localhost:3001') // API-päätepiste tietojen hakemista varten
      .then((res) => res.json())   // Jäsennä vastaus JSON-muodossa
      .then((data) => setData(data)) // Päivitä tila haetuilla tiedoilla
      .catch((error) => console.error("Error fetching data:", error)); // Ota kiinni ja kirjaa kaikki virheet
  }, []); // Tyhjä riippuvuustaulukko tarkoittaa, että tämä tehoste suoritetaan vain kerran, kun komponentti asennetaan

  return (
    // Kääri koko sovellus reitittimeen reitityksen mahdollistamiseksi
    <Router>
      {/* Otsikkokomponentti, joka näkyy jokaisella sivulla */}
      <Header />
      
      {/* Reittien määrittäminen eri sivuille */}
      <Routes>
        {/* Reitti kotisivulle */}
        <Route path="/" element={<Home />} />
        
        {/* Reitti Tietoja-sivulle */}
        <Route path="/about" element={<About />} />
        
        {/* Reitti Palvelut-sivulle */}
        <Route path="/services" element={<Services />} />
        
        {/* Reitti Tilinhallinta-sivulle */}
        <Route path="/accountControl" element={<AccountControl />} />
      </Routes>

      {/* Alatunnistekomponentti, joka näkyy jokaisella sivulla */}
      <Footer />
    </Router>
  );
}

// Sovelluskomponentin vieminen muualle käytettäväksi
export default App;
