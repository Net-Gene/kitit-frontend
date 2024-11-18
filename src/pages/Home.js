
import React from 'react';

import '../styles/Home.css';
// Kuvien tuonti komponentissa käytettäväksi

import blank_user_image from '../assets/blank user.png';
import logo_with_catchphrase from '../assets/Logo with catchphrase.png';
import poster_with_logo from '../assets/Poster with logo.png';

const Home = () => {
    return (
    // Pääsäiliö Home-komponentille

    <div class="home">
      
      {/* Otsikko-osio */}
      <div class="home-header">
        
        {/* Logon ja tunnuslauseen sisältävän otsikon vasen puoli */}
        <div class="home-header-left">
          <img src={logo_with_catchphrase} alt="logo_with_catchphrase" class="logo_with_catchphrase-img"></img>
        </div>
        
        {/* Yhteystiedot ja käyttäjätililinkin sisältävä otsikon oikea puoli */}
        <div class="home-header-right">
          <p>
            Esimerkkitie 1 | 
            96300 Rovaniemi | 
            Avoinna MA-PE 10.30-16.30 | 
            puh. 0400 179000 | 
            y-0000700-4
          </p>
          {/* Linkki tilinhallintasivulle, jossa on käyttäjäkuvake */}
          <a href="/accountControl">
            <img src={blank_user_image} alt="blank_user" class="blank_user-img"></img>
          </a>
        </div>
      </div>
      
      {/* Pääotsikon osa */}
      <div class="title">
        <h1>Etusivu</h1>
      </div>

      {/* Navigointipaneeli alatunnisteessa */}
      <nav class="panel">
        {/* Alatunnisteen sisältösäiliö */}
        <div class="panel-content">
            {/* Navigointilinkit */}
            <div class="panel-links">
              {/* Luettelo alatunnisteessa olevista linkeistä */}
              <ul class="panel-link">
                <li><a href="/about">Tietoa meistä</a></li> {/* Linkki "Tietoja meistä" -sivulle */}
              </ul>
              <ul class="panel-link">
                <li><a href="/contact">Tilaus ja ajanvaraus</a></li> {/* Linkki "Tilaa ja varaus" -sivulle */}
              </ul>
              <ul class="panel-link">
                <li><a href="/services">Palvelut</a></li> {/* Linkki "Palvelut" -sivulle */}
              </ul>
            </div>
          </div>
      </nav>
      
      {/* Sekalaista osio lisäsisällöllä */}
      <div class="misc">
        <h2>Muuta?</h2>
      </div>
      
      {/* Kuvasäiliö logolla varustetulle julisteelle */}
      <div class="poster_with_logo-img">
        <img src={poster_with_logo} alt="poster_with_logo"></img>
      </div>
    </div>
  
    );
};

// Koti-komponentin vieminen käytettäväksi muissa sovelluksen osissa

export default Home;
