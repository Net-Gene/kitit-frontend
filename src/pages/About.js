import React from 'react';
import '../styles/About.css';
import repairing_a_smartphone from '../assets/A_close-up_shot_of_a_worker_repairing_a_smartphone_with_tools.jpg';
import Circular_Economy from '../assets/Circular_Economy.jpg';
import common_repairs_on_laptop from '../assets/common_repairs_on_laptop.jpg';
import recycling from '../assets/recycling.png';
import a_robot_recycling from '../assets/a_robot_recycling.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about_body">
      <Link to="/home"><button className="back-btn"><i class="fa-solid fa-arrow-left"></i></button></Link>
      <main>
        <section className="hero">
          <h1>Kit-IT</h1>
          <p>Uuden elämän antaminen vanhoille laitteille vastuullisesti ja kestävästi.</p>
        </section>
        <section className="content">
          <div className="content-item">
            <div><img src={repairing_a_smartphone} className="content-image"alt="repairing_a_smartphone" /></div>
            <div className="content-text">
              <h2>Tietoja meistä</h2>
              <p>
              Kit-IT on omistautunut kestävän kehityksen edistämiseen elektroniikkalaitteiden kierrätyksen, 
              korjauksen ja huollon avulla.<br /> 
              Uskomme, että jokaisella laitteella on toinen mahdollisuus, 
              ja haluamme auttaa asiakkaitamme vähentämään elektroniikkajätettä ympäristöystävällisin keinoin.                
              </p>
            </div>
          </div>
          <div className="content-item">
          <div><img src={Circular_Economy} className="content-image"alt="Circular_Economy" /></div>
          <div className="content-text">
              <h2>Tehtävämme</h2>
              <p>
              Teemme kestävyydestä saavutettavaa kaikille tarjoamalla kohtuuhintaisia 
              ja vastuullisia ratkaisuja elektroniikan kierrätykseen, korjaukseen ja kunnossapitoon.<br />
              Asiakkaidemme tukemana rakennamme yhdessä vihreämpää tulevaisuutta.
              </p>
            </div>
          </div>
          <div className="content-item">
          <div><img src={common_repairs_on_laptop} className="content-image"alt="common_repairs_on_laptop" /></div>
          <div className="content-text">
              <h2>Mitä teemme</h2>
              <p>
              Tarjoamme laajan valikoiman palveluita, 
              jotka kattavat kaiken rikkinäisten näyttöjen korjauksesta toimimattomien laitteiden kierrätykseen.<br />
              Räätälöimme ratkaisumme sähköisiin tarpeisiisi, samalla kun varmistamme ympäristön hyvinvoinnin.              
              </p>
            </div>
          </div>
          <div className="content-item">
          <div><img src={recycling} className="content-image"alt="recycling" /></div>
            <div className="content-text">
              <h2>Miksi valita Kit-IT?</h2>
              <p>
              Yhdistämme asiantuntemuksen, kilpailukykyiset hinnat 
              ja ympäristötietoisuuden tarjotaksemme vertaansa vailla olevaa palvelua.<br />
              Kun valitset Kit-IT:n, valitset samalla vihreämmän tulevaisuuden.              
              </p>
            </div>
          </div>
          <div className="content-item">
          <div><img src={a_robot_recycling} className="content-image"alt="a_robot_recycling" /></div>
            <div className="content-text">
              <h2>Visiomme</h2>
              <p>
              Näemme maailman, jossa yksikään elektroninen laite ei mene hukkaan.<br />
              Haluamme tehdä kestävästä kehityksestä elämäntavan, 
              jossa teknologia ja ympäristö kulkevat käsi kädessä.              
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
