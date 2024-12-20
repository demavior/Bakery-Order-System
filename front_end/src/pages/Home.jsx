// Home.jsx
import React, { useState } from 'react';
import drinksImg from '/drinks.jpg'
import breadsImg from '/breads.jpg'
import pastriesImg from '/pastries.jpg'

function Home() {
  const [showOffer, setShowOffer] = useState(false);

  const handleShowOffer = () => {
    setShowOffer(true);
  };

  return (
    <main>
      <section>
        <h2>We offer different types of products</h2>
        <ul>
          <li>Breads</li>
          <img src={breadsImg} alt="Breads" width="400" height="250" />
          <li>Pastries</li>
          <img src={pastriesImg} alt="Pastries" width="400" height="250" />
          <li>Coffee and Juices</li>
          <img src={drinksImg} alt="Drinks" width="400" height="250" />
        </ul>

        <h2>Special Offer</h2>
        {showOffer ? (
          <ul>
            <li>50% off on all pastries!</li>
            <li>Free coffee with any bread purchase!</li>
          </ul>
        ) : (
          <button onClick={handleShowOffer}>Show Offer</button>
        )}

        <h3>Visit us or make an order online</h3>
      </section>
    </main>
  );
}

export default Home;