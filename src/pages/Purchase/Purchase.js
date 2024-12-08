import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Purchase.css";
import BASE_URL from "../../config/config";
import { Link } from "react-router-dom";
import { useFetchUserId } from "../../hooks/useFetchUser";

const Purchase = () => {
  // Tila tallennettavalle tuoteluettelolle, joka on haettu taustajärjestelmästä
  const [products, setProducts] = useState([]);

  // Mukautettu koukku, joka hakee ja palauttaa nykyisen käyttäjätunnuksen, voi olla tyhjä, jos käyttäjä ei ole kirjautunut sisään
  const userId = useFetchUserId();

  // useEffect hook noutaa tuotetiedot taustajärjestelmästä, kun komponentti hahmonnetaan ensimmäisen kerran
  useEffect(() => {
    // HTTP GET -pyynnön tekeminen tuoteluettelon hakemiseksi taustajärjestelmästä
    axios
      .get(`${BASE_URL}/api/products/get-products`) // URL muodostetaan käyttämällä BASE_URL-osoitetta konfiguraatiosta
      .then((response) => {
        setProducts(response.data); // Säilytä noudetut tuotteet kunnossa
      })
      .catch((error) => {
        // Käsittele mahdolliset virheet hakuprosessin aikana
        console.error("There was an error fetching the products:", error);
      });
  }, []); // Tyhjä riippuvuustaulukko tarkoittaa, että tämä suoritetaan vain kerran, kun komponentti on asennettu

  const handleAddToCart = (productId, price) => {
    // Jos käyttäjä ei ole kirjautunut sisään, näytä hälytys ja poistu
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const quantity = 1; // Kovakoodattu määrä toistaiseksi.

    // HTTP POST -pyynnön tekeminen tuotteen lisäämiseksi käyttäjän ostoskoriin
    axios
      .post(`${BASE_URL}/api/products/add-to-cart`, {
        productId,
        quantity,
        userId, // Liitä ostoskori oikeaan käyttäjään lähettämällä käyttäjätunnus
      })
      .then((response) => {
        console.log("Product added to cart:", response.data); // Kirjaa vastaus virheenkorjausta varten
        alert("Product added to cart!"); // Ilmoita käyttäjälle, että tuote on lisätty onnistuneesti
      })
      .catch((error) => {
        // Käsittele mahdolliset virheet, kun lisäät tuotetta ostoskoriin
        console.error(
          "There was an error adding the product to the cart:",
          error,
        );
      });
  };

  return (
    <div className="purchase-page">
      <Link to="/services">
        <button className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </Link>

      <header>
        <h1>Tilaa ja osta</h1>
        <p>Valitse ostettavat tuotteet</p>
      </header>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="content-image">
              {/* Korvaa todellisella tuotekuvalla, kun se on saatavilla */}
            </div>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>Price: €{product.price}</p>
            <button
              className="button"
              onClick={() => handleAddToCart(product.id, product.price)}
            >
              Lisää ostoskoriin
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
