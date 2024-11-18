import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Import pages and header/footer components
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Services from './pages/Services';
import AccountControl from './pages/AccountControl';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderAndAppointment from './pages/OrderAndAppointment';

// Import footer styles
import './styles/Footer.css';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {/* Muuta otsikko ehdollisesti, jos se ei ole kirjautumis-tai rekisteröintisivuilla */}
      {!isAuthPage && <Header />}

      {/* Määritä reitit eri sivuille */}
      <Routes>
         {/* Reitti kirjautumissivulle */}
         <Route path="/" element={<Login />} />

          {/* Reitti rekistöitymis sivulle */}
        <Route path="/register" element={<Register />} />

        {/* Reitti kotisivulle */}
        <Route path="/home" element={<Home />} />
      
        {/* Reitti Tietoja-sivulle */}
        <Route path="/about" element={<About />} />

        {/* Reitti Tilaus ja ajanvaraus-sivulle */}
        <Route path="/orderAndAppointment" element={<OrderAndAppointment />} />
        
        {/* Reitti Palvelut-sivulle */}
        <Route path="/services" element={<Services />} />
        
        {/* Reitti Tilinhallinta-sivulle */}
        <Route path="/accountControl" element={<AccountControl />} />
      </Routes>

      {/* Ehdollisesti renderöi alatunniste, jos se ei ole kirjautumis-tai rekisteröintisivuilla */}
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    // Wrap the entire app in a router to enable routing
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;