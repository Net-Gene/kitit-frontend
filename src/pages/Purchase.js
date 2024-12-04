import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Purchase.css';

const Purchase = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  // Haetaan user id
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/check-auth-token', { withCredentials: true })
      .then((response) => {
        console.log('Fetched User ID:', response.data.userId);
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.error('Error fetching user ID:', error);
      });
  }, []);

  
  // Hae tuotteet taustajärjestelmästä

  useEffect(() => {
    axios.get('http://localhost:3001/api/products/get-products')
      .then((response) => {
        setProducts(response.data);  // Säilytä tuotteet kunnossa

      })
      .catch((error) => {
        console.error('There was an error fetching the products:', error);
      });
  }, []);

  const handleAddToCart = (productId, price) => {
    if (!userId) {
      alert('User not logged in.');
      return;
    }
    const quantity = 1; // Olettaen, että käyttäjä lisää yhden kohteen kerrallaan, mutta voit muokata sitä käyttäjän syötteen perusteella.


    axios.post('http://localhost:3001/api/products/add-to-cart', {
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
    <a href="/home"><button className="back-btn"><i class="fa-solid fa-arrow-left"></i></button></a>
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
