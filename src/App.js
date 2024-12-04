import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


// Tuo sivut ja ylä-/alatunnistekomponentit

import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Services from './pages/Services';
import AccountControl from './pages/AccountControl';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderAppointments from './pages/OrderAppointments';
import Purchase from './pages/Purchase';
import ShoppingCart from './pages/ShoppingCart';
// Tuo alatunnisteen tyylejä

import './styles/Footer.css';


function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';


  return (
    <>
      {/* Renderöi otsikko ehdollisesti, jos ei kirjautumis-tai rekisteröintisivuilla */}
      {!isAuthPage && <Header />}

      {/* Määritä reitit */}
      <Routes>
        {/* Julkiset reitit */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Suojatut reitit */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/orderAppointments" element={<OrderAppointments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/accountControl" element={<AccountControl />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Route>
      </Routes>

      {/* Piirrä alatunniste ehdollisesti, jos se ei ole kirjautumis-tai rekisteröintisivuilla */}
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    // Kääri koko sovellus reitittimeen ottaaksesi reitityksen käyttöön

    <Router>
      <AppContent />
    </Router>
  );
}

export default App;