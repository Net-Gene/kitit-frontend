import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


// Import pages and header/footer components
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
// Import footer styles
import './styles/Footer.css';


function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';


  return (
    <>
      {/* Render Header conditionally if not on login or register pages */}
      {!isAuthPage && <Header />}

      {/* Define routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
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

      {/* Render Footer conditionally if not on login or register pages */}
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