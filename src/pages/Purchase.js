import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Purchase.css';

const Purchase = () => {
  const [products, setProducts] = useState([]);
  const [userId] = useState(1); // Olettaen, että käyttäjätunnus on tällä hetkellä 1. Korvaa todellisilla käyttäjätiedoilla.

  
  // Hae tuotteet taustajärjestelmästä

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then((response) => {
        setProducts(response.data);  // Säilytä tuotteet kunnossa

      })
      .catch((error) => {
        console.error('There was an error fetching the products:', error);
      });
  }, []);

  const handleAddToCart = (productId, price) => {
    const quantity = 1; // Olettaen, että käyttäjä lisää yhden kohteen kerrallaan, mutta voit muokata sitä käyttäjän syötteen perusteella.


    axios.post('http://localhost:3001/add-to-cart', {
      productId,
      quantity,
      userId
    })
      .then((response) => {
        console.log('Product added to cart:', response.data);
        alert('Product added to cart!');
      })
      .catch((error) => {
        console.error('There was an error adding the product to the cart:', error);
      });
  };

  return (
    <div className="purchase-page">
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
              className="add-to-cart"
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
