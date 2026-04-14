import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      <Header cartCount={cartCount} />
      <ProductList onAddToCart={handleAddToCart} />
      <Footer />
    </>
  );
}

export default App;
