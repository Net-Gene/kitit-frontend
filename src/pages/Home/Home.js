import React from "react";
import "./Home.css";
import blank_user_image from "../../assets/blank user.png";
import logo_with_catchphrase from "../../assets/Logo with catchphrase.png";
import poster_with_logo from "../../assets/Poster with logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <div className="home-header-left">
          <img
            src={logo_with_catchphrase}
            alt="logo_with_catchphrase"
            className="logo_with_catchphrase-img"
          />
        </div>
        <div className="home-header-right">
          <p>
            Esimerkkitie 1 | 96300 Rovaniemi | Avoinna MA-PE 10.30-16.30 | puh.
            0400 179000 | y-0000700-4
          </p>
          <Link to="/accountControl">
            <img
              src={blank_user_image}
              alt="blank_user"
              className="blank_user-img"
            />
          </Link>
        </div>
      </div>
      <div className="title">
        <h1>Etusivu</h1>
      </div>
      <nav className="panel">
        <div className="panel-content">
          <Link to="/about">
            <ul className="panel-link">Tietoa meistä</ul>
          </Link>
          <Link to="/orderAppointments">
            <ul className="panel-link">Ajanvaraukseen</ul>
          </Link>
          <Link to="/services">
            <ul className="panel-link">Palvelut</ul>
          </Link>
        </div>
      </nav>
      <div className="misc">
        <div className="recycling-info">
          <h3>E-jätteen ympäristövaikutukset</h3>
          <p>
            Tiesitkö, että elektroniikkaromu on yksi nopeimmin kasvavista
            jätevirroista maailmanlaajuisesti? Vanhojen laitteiden
            kierrättäminen on tärkeä askel saastumisen vähentämisessä ja
            arvokkaiden luonnonvarojen säästämisessä. Kierrättämällä
            elektroniikkaromua autat edistämään kestävämpää tulevaisuutta ja
            vähentämään e-waste -saasteiden aiheuttamaa ympäristöriskiä.
          </p>
        </div>
        <div className="steps-to-recycle">
          <h3>Vanhojen laitteidesi kierrätyksen vaiheet</h3>
          <ol>
            <li>1. Toimita vanha elektroniikka kierrätyspisteeseemme.</li>
            <li>2. Toimita vanha elektroniikka kierrätyspisteeseemme.</li>
            <li>
              3. Kierrätettävät komponentit käsitellään tehokkaasti, ja
              vaaralliset materiaalit hävitetään vastuullisesti ympäristöä
              kunnioittaen.
            </li>
          </ol>
        </div>
      </div>
      <div className="poster_with_logo-img">
        <img src={poster_with_logo} alt="poster_with_logo" />
      </div>
    </div>
  );
};

export default Home;
