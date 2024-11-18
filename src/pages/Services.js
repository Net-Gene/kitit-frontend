import React from 'react';
import '../styles/Service.css';

const Services = () => {
  return (
    <div class="content">
      <a href="/home">
        <button class="back-btn">&larr;</button>
      </a>
    <div class="grid">
      <div class="item">
        <a href="/buyPc">
          <button class="service-btn">
            Osta Tietokone
            <span class="icon">&#128722;</span>
          </button>
        </a>
      </div>
      <div class="item">
        <a href="/changePc">
          <button class="service-btn">
            Vaihda Tietokoneesi
            <span class="icon">&#10227;</span>
          </button>
        </a>
      </div>
      <div class="item">
        <a href="/fixPc">
          <button class="service-btn">
            Korjaa Tietokoneesi
            <span class="icon">&#128295;</span>
          </button>
        </a>
      </div>
      <div class="item">
        <a href="/giftPc">
          <button class="service-btn">
            Lahjoita Tietokoneesi
            <span class="icon">&#127873;</span>
          </button>
        </a>
      </div>
    </div>
  </div>

  );
};

export default Services;