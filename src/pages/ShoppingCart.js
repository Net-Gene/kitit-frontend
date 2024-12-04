import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fallout_boy from '../assets/fallout boy.png';

import '../styles/ShoppingCart.css';
import BASE_URL from '../components/config'; 

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);


    

    useEffect(() => {
        // Hae tilaukset taustajärjestelmästä, kun komponentti on asennettu
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/products/get-orders`, { withCredentials: true });
                const formattedItems = response.data.map((item) => ({
                id: item.product_id,
                orderId: item.order_id,
                name: item.product_name,
                description: item.product_description,
                quantity: item.quantity,
                price: item.item_price,
            }));
            setCartItems(formattedItems);
            } catch (error) {
                alert('Virhe tilausten noutamisessa:' + error.message);
            }
        };

        fetchOrders();
    }, []);



    // tuotteen poisto
    const removeProduct = async (productId, orderId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/products/remove-from-cart`, {
                withCredentials: true,
                data: { productId, orderId },
            });
    
            if (response.status === 200) {
                setCartItems(cartItems.filter((item) => item.id !== productId));
                alert('Tuote poistettu onnistuneesti');
            } else {
                alert(response.data.message || 'Tuotteen poistaminen epäonnistui');
            }
        } catch (error) {
            console.error('Virhe poistettaessa tuotetta:', error);
            alert('Tuotetta poistettaessa tapahtui virhe', error);
        }
    };


    const handleConfirmClick = () => {
        setIsConfirmVisible(true);
    };

    const handleCloseConfirm = () => {
        setIsConfirmVisible(false);
    };
    const handlePurchaseSuccess = async (orderId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/products/complete-order`,
                { orderId },
                { withCredentials: true }
            );
    
            if (response.status === 200) {
                alert('Ostos suoritettu onnistuneesti');
                setCartItems([]); // Clear the cart
                setIsPurchaseSuccessful(true);
            } else {
                alert(response.data.message || 'Ostoksen suorittaminen epäonnistui');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Tuotetunnus tai tilaustunnus puuttuu.");
            }
            else if (error.response && error.response.status === 404) {
                alert("Tuotetta ei löydy ostoskorista.");
            }
            else {
            alert('Ostoa suoritettaessa tapahtui odottamaton virhe: ' + error.message);
            }
        }
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




                    <button
                        className="confirm-purchase"
                        onClick={handleConfirmClick}
                        style={{ display: cartItems.length > 0 ? 'block' : 'none' }}
                    >
                        Vahvista ostos
                    </button>

                    {/* Vahvistusponnahdusikkunan ehdollinen renderöinti */}
                    {isConfirmVisible && (
                        <div className="confirm-box">
                            <p>Haluatko varmasti vahvistaa tämän ostoksen?</p>
                            <button
                                className="confirm-yes"
                                onClick={() => handlePurchaseSuccess(cartItems[0]?.orderId)}
                            >
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
                    <a href="/home"><button className="back-btn"><i class="fa-solid fa-arrow-left"></i></button></a>
                    </div>
            )}
        </div>
    );
};

export default ShoppingCart;
