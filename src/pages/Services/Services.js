import React from "react";
import "./Service.css";
import { Link } from "react-router-dom";

const Services = () => {
  // Toiminto, joka näyttää hälytyksen tulevista ominaisuuksista
  const handleComingSoon = () => {
    alert("Tämä ominaisuus on tulossa!");
  };

  return (
    <div className="content">
      <Link to="/home">
        <button className="back-btn-service">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </Link>
      <div className="grid">
        <div className="item">
          <Link to="/purchase">
            <button className="service-btn">
              Osta Laite
              <span className="service-icon">
                <i class="fa-solid fa-shop"></i>
              </span>
            </button>
          </Link>
        </div>
        <div className="item">
          <button className="service-btn" onClick={handleComingSoon}>
            Vaihda Laite
            <span className="service-icon">
              <i class="fa-solid fa-repeat"></i>
            </span>
          </button>
        </div>
        <div className="item">
          <button className="service-btn" onClick={handleComingSoon}>
            Korjaa Laite
            <span className="service-icon">
              <i class="fa-solid fa-screwdriver-wrench"></i>
            </span>
          </button>
        </div>
        <div className="item">
          <button className="service-btn" onClick={handleComingSoon}>
            Lahjoita Laite
            <span className="service-icon">
              <i class="fa-solid fa-gift"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
