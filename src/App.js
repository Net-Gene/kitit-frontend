import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"; // Tuodaan React Routerin reitityskomponentit käyttöön
import PrivateRoute from "./components/auth/PrivateRoute"; // Tuodaan oma komponentti suojattuja reittejä varten

import "./styles/buttons.css"; // Tuodaan tyylit nappuloille
import "./styles/backButton.css"; // Tuodaan tyylit takanappulalle

// Tuodaan sivut ja komponentit, jotka tullaan renderöimään reittien mukaan
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Services from "./pages/Services/Services";
import AccountControl from "./pages/AccountControl/AccountControl";
import Header from "./components/navigation/Header/Header"; // Tuodaan yläreunan navigointikomponentti
import Footer from "./components/navigation/Footer/Footer"; // Tuodaan alatunnistekomponentti
import OrderAppointments from "./pages/OrderAppointments/OrderAppointments";
import Purchase from "./pages/Purchase/Purchase";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";

// Tuo alatunnisteen tyylit
import "./components/navigation/Footer/Footer.css";

// AppContent-komponentti on sovelluksen pääkomponentti, joka määrittää reitityksen ja renderöi sivuja
function AppContent() {
  const location = useLocation(); // Käytetään reititysinformaatiota nykyisestä reitistä
  const isAuthPage = // Tarkistetaan, onko käyttäjä kirjautumis- tai rekisteröintisivulla
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {/* Renderöi Header-komponentti vain, jos ei olla kirjautumis- tai rekisteröintisivulla */}
      {!isAuthPage && <Header />}

      {/* Määritetään reitit */}
      <Routes>
        {/* Julkiset reitit: nämä ovat reittejä, jotka voi nähdä ilman kirjautumista */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Suojatut reitit: nämä reitit ovat suojattuja ja vaativat kirjautumisen */}
        <Route element={<PrivateRoute />}>
          {" "}
          {/* PrivateRoute huolehtii kirjautumisen tarkistamisesta */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/orderAppointments" element={<OrderAppointments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/accountControl" element={<AccountControl />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Route>
      </Routes>

      {/* Renderöi Footer-komponentti vain, jos ei olla kirjautumis- tai rekisteröintisivulla */}
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    // Kääritään koko sovellus Router-komponenttiin, jotta reititys toimii
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
