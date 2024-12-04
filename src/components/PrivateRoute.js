import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from './config'; 

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // Lähetä pyyntö palvelimelle tunnuksen vahvistamiseksi

        const response = await axios.get(`${BASE_URL}/api/auth/check-auth-token`, { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        alert("Virhe 'PrivateRoute' komponentin kanssa: " + error.message)
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
