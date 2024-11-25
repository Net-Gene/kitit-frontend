import React, { useState, useEffect } from 'react';
import fallout_boy from '../assets/fallout boy.png';
import { useNavigate } from 'react-router-dom';

import '../styles/ShoppingCart.css';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Tuotteen nimi', description: 'Kuvaus', quantity: 2, price: 10, orderId: 123 },
        { id: 2, name: 'Toinen tuote', description: 'Toinen kuvaus', quantity: 1, price: 20, orderId: 123 },
    ]);

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
    const [orders, setOrders] = useState([]);  // valtio kirjaa tilaukset
    
    const navigate = useNavigate();

    const removeProduct = async (productId, orderId) => {
        try {
          const response = await fetch('http://localhost:3001/remove-from-cart', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, orderId }),
          });
      
          if (response.ok) {
            // Update state by filtering out the removed product
            setCartItems(cartItems.filter((item) => item.id !== productId));
            alert('Product removed successfully');
          } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to remove product');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while removing the product');
        }
      };



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
                        {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <p>Tilauksen ID: {item.orderId}</p>
                                <p>Tuote: {item.name}</p>
                                <p>Kuvaus: {item.description}</p>
                                <p>Määrä: {item.quantity}</p>
                                <p>Hinta per tuote: {item.price} €</p>
                                <p>Kokonaishinta: {(item.price * item.quantity).toFixed(2)} €</p>
                                <button
                                className="remove-item" onClick={() => removeProduct(item.id, item.orderId)}>Poista</button>
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
