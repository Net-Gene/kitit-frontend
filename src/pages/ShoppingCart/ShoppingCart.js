import React, { useState, useEffect } from "react";
import axios from "axios";
import fallout_boy from "../../assets/fallout boy.png";

import "./ShoppingCart.css";
import BASE_URL from "../../config/config";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  // Määritä muuttujat ostoskorin kohteiden ja käyttäjien vuorovaikutusten hallitsemiseksi
  const [cartItems, setCartItems] = useState([]); // Tallentaa ostoskorin tuotteet
  const [isConfirmVisible, setIsConfirmVisible] = useState(false); // Vahvistusruudun näkyvyys päälle/pois
  const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false); // Seuraa, jos osto onnistuu

  // Käytä tehostekoukkua tilausten hakemiseen, kun komponentti kiinnitetään
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/products/get-orders`,
          { withCredentials: true }, // Varmistaa, että evästeet lähetetään istunnon käsittelypyynnön mukana
        );

        // Muotoile API:lta saadut tiedot käsittelyn helpottamiseksi
        const formattedItems = response.data.map((item) => ({
          id: item.product_id,
          orderId: item.order_id,
          name: item.product_name,
          description: item.product_description,
          quantity: item.quantity,
          price: item.item_price,
        }));

        // Aseta ostoskorin tuotteiden tila muotoilluilla tiedoilla
        setCartItems(formattedItems);
      } catch (error) {
        alert("Virhe tilausten noutamisessa:" + error.message); // Virheen käsittely, jos API-kutsu epäonnistuu
      }
    };

    fetchOrders(); // Hae tilaukset, kun komponentti latautuu
  }, []); // Tyhjä riippuvuustaulukko tarkoittaa, että tämä tehoste suoritetaan vain kerran, kun komponentti asennetaan

  // Toiminto tuotteen poistamiseksi ostoskorista
  const removeProduct = async (productId, orderId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/products/remove-from-cart`,
        {
          withCredentials: true, // Varmista, että evästeet lähetetään todennusta varten
          data: { productId, orderId }, // Tiedot, joita tarvitaan poistettavan tuotteen tunnistamiseen
        },
      );

      // Jos vastaus onnistuu (tilakoodi 200), päivitä ostoskorin tila
      if (response.status === 200) {
        setCartItems(cartItems.filter((item) => item.id !== productId)); // Suodata poistettu tuote pois
        alert("Tuote poistettu onnistuneesti"); // Ilmoita käyttäjälle onnistumisesta
      } else {
        alert(response.data.message || "Tuotteen poistaminen epäonnistui"); // Ilmoita epäonnistumisesta viestillä
      }
    } catch (error) {
      console.error("Virhe poistettaessa tuotetta:", error); // Kirjaa virhe virheenkorjausta varten
      alert("Tuotetta poistettaessa tapahtui virhe", error); // Näytä virheilmoitus käyttäjälle
    }
  };

  // Toiminto, joka näyttää vahvistusmoodin
  const handleConfirmClick = () => {
    setIsConfirmVisible(true); // Aseta vahvistusmoodiksi näkyväksi
  };

  // Toiminto vahvistusmoodin sulkemiseksi
  const handleCloseConfirm = () => {
    setIsConfirmVisible(false); // Aseta vahvistusmoodiksi piilotettu
  };

  // Toiminto hoitaa oston loppuunsaattamisen
  const handlePurchaseSuccess = async (orderId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/products/complete-order`,
        { orderId }, // Merkitse tilaus valmiiksi lähettämällä orderId
        { withCredentials: true }, // Varmista, että evästeet lähetetään istunnon käsittelyä varten
      );

      // Jos vastaus onnistuu (tilakoodi 200), tyhjennä ostoskori ja näytä onnistumisviesti
      if (response.status === 200) {
        alert("Ostos suoritettu onnistuneesti"); // Menestysviesti
        setCartItems([]); // Tyhjennä kärry
        setIsPurchaseSuccessful(true); // Merkitse osto onnistuneeksi
      } else {
        alert(response.data.message || "Ostoksen suorittaminen epäonnistui"); // Virheilmoitus, jos osto epäonnistuu
      }
    } catch (error) {
      // Käsittele erilaisia ​​virhevastauksia tilakoodin perusteella
      if (error.response && error.response.status === 400) {
        alert("Tuotetunnus tai tilaustunnus puuttuu."); // Tuote tai tilaustunnus puuttuu
      } else if (error.response && error.response.status === 404) {
        alert("Tuotetta ei löydy ostoskorista."); // Tuotetta ei löydy ostoskorista
      } else {
        alert(
          "Ostoa suoritettaessa tapahtui odottamaton virhe: " + error.message,
        ); // Odottamaton virhe
      }
    }
  };

  return (
    <div className="cart-page">
      {/* Näytä ostoskorin sisältö tai menestysviesti ehdollisesti */}
      {!isPurchaseSuccessful ? (
        <>
          <header>
            <Link to="/home">
              <button className="back-btn">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </Link>
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
                  <p>
                    Kokonaishinta: {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  <button
                    className="remove-item"
                    onClick={() => removeProduct(item.id, item.orderId)}
                  >
                    Poista
                  </button>
                </div>
              ))
            ) : (
              <p>Ei tuotteita ostoskorissa.</p>
            )}
          </div>

          <button
            className="confirm-purchase"
            onClick={handleConfirmClick}
            style={{ display: cartItems.length > 0 ? "block" : "none" }}
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
            <img
              src={fallout_boy}
              alt="fallout_boy"
              className="fallout_boy-img"
            />
            <p>Tilauksesi on käsitelty. </p>
            <p>Kierrätit vastuullisesti, kiitos ostoksista kanssamme!</p>
          </div>
          <Link to="/home">
            <button className="back-btn">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
