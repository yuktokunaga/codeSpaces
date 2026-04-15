import React from "react";
import "./TeaCollection.css";

import darjeeling from "../assets/images/Darjeeling.jpg";
import earlgrey from "../assets/images/earl.jpg";
import assam from "../assets/images/assam.jpg";
import chamomile from "../assets/images/chamomile.jpg";
import matcha from "../assets/images/matcha.jpg";
import oolong from "../assets/images/oolong.jpg";
import green from "../assets/images/green.jpg";
import white from "../assets/images/white.jpg";
import masala from "../assets/images/masala.jpg";
import herbal from "../assets/images/herbal.jpg";

const teas = [
  {
    name: "Darjeeling Tea",
    price: "₹1800",
    benefit: "Improves digestion and immunity",
    image: darjeeling
  },
  {
    name: "Earl Grey",
    price: "₹1200",
    benefit: "Reduces stress and boosts heart health",
    image: earlgrey
  },
  {
    name: "Assam Tea",
    price: "₹1000",
    benefit: "Boosts energy and improves focus",
    image: assam
  },
  {
    name: "Chamomile",
    price: "₹980",
    benefit: "Helps in relaxation and sleep",
    image: chamomile
  },
  {
    name: "Matcha",
    price: "₹2500",
    benefit: "Rich in antioxidants",
    image: matcha
  },
  {
    name: "Oolong Tea",
    price: "₹1600",
    benefit: "Supports weight management",
    image: oolong
  },
  {
    name: "Green Tea",
    price: "₹900",
    benefit: "Improves metabolism",
    image: green
  },
  {
    name: "White Tea",
    price: "₹2000",
    benefit: "Anti-aging properties",
    image: white
  },
  {
    name: "Masala Tea",
    price: "₹800",
    benefit: "Boosts immunity and warmth",
    image: masala
  },
  {
    name: "Herbal Mix",
    price: "₹1100",
    benefit: "Detox and relaxation",
    image: herbal
  }
];

function TeaCollection({ onAddToCart }) {
  return (
    <div className="tea-page">
      <h1 className="tea-title">
        Make yourself comfortable and improve your health 🍵
      </h1>

      <div className="tea-container">
        {teas.map((tea, index) => (
          <div className="tea-card" key={index}>
            <img src={tea.image} alt={tea.name} />
            <h2>{tea.name}</h2>
            <p>{tea.benefit}</p>
            <h3>{tea.price}</h3>
            <button onClick={onAddToCart}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeaCollection;