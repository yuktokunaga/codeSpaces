import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'ダージリン・ファーストフラッシュ',
    price: 1800,
    image: 'https://placehold.co/400x300/e8f5e9/2e7d32?text=Darjeeling',
  },
  {
    id: 2,
    name: 'アールグレイ・クラシック',
    price: 1200,
    image: 'https://placehold.co/400x300/fff3e0/e65100?text=Earl+Grey',
  },
  {
    id: 3,
    name: '宇治抹茶・極み',
    price: 2500,
    image: 'https://placehold.co/400x300/e8f5e9/1b5e20?text=Matcha',
  },
  {
    id: 4,
    name: 'リラックス・カモミール',
    price: 980,
    image: 'https://placehold.co/400x300/fff8e1/f57f17?text=Chamomile',
  },
];

function ProductList({ onAddToCart }) {
  return (
    <main className="product-list" id="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </main>
  );
}

export default ProductList;
