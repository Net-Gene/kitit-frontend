import React, { useState, useEffect } from 'react';
import fallout_boy from '../assets/fallout boy.png';

import '../styles/ShoppingCart.css';

const ShoppingCart = () => {
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
    const [orders, setOrders] = useState([]);  // valtio kirjaa tilaukset




    useEffect(() => {
        // Hae tilaukset taustajärjestelmästä, kun komponentti on asennettu



        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/orders');  // Säädä URL-osoite vastaamaan sovellusliittymääsi



                if (!response.ok) {
                    throw new Error('Tilausten nouto epäonnistui');
                }
                const data = await response.json();
                setOrders(data);  // Aseta pyydetyt tilaukset tilaan



            } catch (error) {
                console.error('Virhe tilausten noutamisessa:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleConfirmClick = () => {
        setIsConfirmVisible(true);
    };

    const handleCloseConfirm = () => {
        setIsConfirmVisible(false);
    };

    const handlePurchaseSuccess = () => {
        setIsPurchaseSuccessful(true);
    };

    return (
        <div className="cart-page">
            {/* Näytä ostoskorin sisältö tai menestysviesti ehdollisesti */}
            {!isPurchaseSuccessful ? (
                <>
                    <header>
                        <h1>Ostoskori</h1>
                        <p>Tarkista tuotteet</p>
                    </header>
                    <div className="cart-items">
                        {/* Renderöi tilaukset dynaamisesti */}
                        {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <div className="cart-item" key={`${order.order_id}-${index}`}>
                                <p>Tilauksen ID: {order.order_id}</p>
                                <p>Tuote: {order.product_name}</p>
                                <p>Kuvaus: {order.product_description}</p>
                                <p>Määrä: {order.quantity}</p>
                                <p>Hinta per tuote: {order.item_price} €</p>
                                <p>Kokonaishinta: {order.total_price} €</p>
                                <button className="remove-item">Poista</button>
                            </div>
                        ))
                    ) : (
                        <p>Ei tuotteita ostoskorissa.</p>
                    )}

                    </div>
                    <button className="confirm-purchase" onClick={handleConfirmClick}>
                        Vahvista ostos
                    </button>

                    {/* Vahvistusponnahdusikkunan ehdollinen renderöinti */}
                    {isConfirmVisible && (
                        <div className="confirm-box">
                            <p>Haluatko varmasti vahvistaa tämän ostoksen?</p>
                            <button className="confirm-yes" onClick={handlePurchaseSuccess}>
                                Kyllä
                            </button>
                            <button className="confirm-no" onClick={handleCloseConfirm}>
                                En
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="confirm-page">
                    <header>
                        <h1>Kiitos!</h1>
                        <p>Ostoksesi onnistui.</p>
                    </header>
                    <div className="success-content">
                        <img src={fallout_boy} alt="fallout_boy" className="fallout_boy-img" />
                        <p>Tilauksesi on käsitelty. </p>
                        <p>Kierrätit vastuullisesti, kiitos ostoksista kanssamme!</p>
                    </div>
                    <a href="/home">
                        <button className="back-btn">&larr; Etusivulle</button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
