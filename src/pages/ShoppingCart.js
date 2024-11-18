import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Käytä useNavigatea useHistoryn sijaan
import fallout_boy from '../assets/fallout boy.png'

import '../styles/ShoppingCart.css';

const ShoppingCart = () => {
    // State käsittelemään vahvistusponnahdusikkunan näkyvyyttä

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    // valtio hoitaa onnistuneen oston

    const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);

    const navigate = useNavigate(); // Alusta navigointi


    // Vaihda vahvistusponnahdusikkunan näkyvyyttä

    const handleConfirmClick = () => {
        setIsConfirmVisible(true);
    };

    // Sulje vahvistusikkuna

    const handleCloseConfirm = () => {
        setIsConfirmVisible(false);
    };

    // Käsittele onnistunut osto

    const handlePurchaseSuccess = () => {
        setIsPurchaseSuccessful(true);
    };

    return (
        <div class="cart-page">
            {/* Näytä ostoskorin sisältö tai menestysviesti ehdollisesti */}
            {!isPurchaseSuccessful ? (
                <>
                    <header>
                        <h1>Ostoskori</h1>
                        <p>Tarkista tuotteet</p>
                    </header>
                    <div class="cart-items">
                        <div class="cart-item">
                            <p>Tuotteen nimi</p>
                            <button class="remove-item">Poista</button>
                        </div>
                        <div class="cart-item">
                            <p>Tuotteen nimi</p>
                            <button class="remove-item">Poista</button>
                        </div>
                    </div>
                    <button class="confirm-purchase" onClick={handleConfirmClick}>
                        Vahvista ostos
                    </button>

                    {/* Vahvistusponnahdusikkunan ehdollinen renderöinti */}
                    {isConfirmVisible && (
                        <div class="confirm-box">
                            <p>Haluatko varmasti vahvistaa tämän ostoksen?</p>
                            <button class="confirm-yes" onClick={handlePurchaseSuccess}>
                                Kyllä
                            </button>
                            <button class="confirm-no" onClick={handleCloseConfirm}>
                                En
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div class="confirm-page">
                    <header>
                        <h1>Kiitos!</h1>
                        <p>Ostoksesi onnistui.</p>
                    </header>
                    <div class="success-content">
                        <img src={fallout_boy} alt="fallout_boy" className="fallout_boy-img" />
                        <p>Tilauksesi on käsitelty. </p>
                        <p>Kierrätit vastuullisesti, kiitos ostoksista kanssamme!</p>
                    </div>
                    <a href="/home">
                        <button class="back-btn">&larr; Etusivulle</button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
