import React from 'react';
import '../styles/Service.css';
import { Link } from 'react-router-dom';

const Services = () => {
  // Function to show alert for upcoming features
  const handleComingSoon = () => {
    alert("Tämä ominaisuus on tulossa!");
  };

  return (
    <div className="content">
      <Link to="/home"><button className="back-btn-service"><i className="fa-solid fa-arrow-left"></i></button></Link>
      <div className="grid">
        <div className="item">
          <Link to="/purchase">
            <button className="service-btn">
              Osta Laite
              <span className="icon">&#128722;</span>
            </button>
          </Link>
        </div>
        <div className="item">
          <button className="service-btn" onClick={handleComingSoon}>
            Vaihda Laite
            <span className="icon">&#10227;</span>
          </button>
        </div>
        <div className="item">
          <button className="service-btn" onClick={handleComingSoon}>
            Korjaa Laite
            <span className="icon">&#128295;</span>
          </button>
        </div>
        <div className="item">
          <button className="service-btn" onClick={handleComingSoon}>
            Lahjoita Laite
            <span className="icon">&#127873;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
