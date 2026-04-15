import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import TeaCollection from './components/TeaCollection';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      <Header cartCount={cartCount} />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={<ProductList onAddToCart={handleAddToCart} />}
        />

        {/* Tea Collection Page */}
        <Route
          path="/tea"
          element={<TeaCollection onAddToCart={handleAddToCart} />}
        />
      </Routes>
    </>
  );
}

export default App;