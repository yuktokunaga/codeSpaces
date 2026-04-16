import React from "react";
import { useEffect, useState } from "react";
import "./TeaCollection.css";

// Static imports kept as requested, though data will now come from MongoDB
// import darjeeling from "/public/images/Darjeeling.jpg";
// import earlgrey from "/public/images/earl.jpg";
// import assam from "/public/images/assam.jpg";
// import chamomile from "/public/images/chamomile.jpg";
// import matcha from "/public/images/matcha.jpg";
// import oolong from "/public/images/oolong.jpg";
// import green from "/public/images/green.jpg";
// import white from "/public/images/white.jpg";
// import masala from "/public/images/masala.jpg";
// import herbal from "/public/images/herbal.jpg";

function TeaCollection({ onAddToCart }) {
  const [teas, setTeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/teas')
      .then((res) => res.json())
      .then((data) => {
        setTeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Database Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="tea-page"><h1 className="tea-title">Connecting to Atlas...</h1></div>;

  return (
    <div className="tea-page">
      <h1 className="tea-title">
        Make yourself comfortable and improve your health 🍵
      </h1>

      <div className="tea-container">
        {teas.map((tea) => (
          <div className="tea-card" key={tea._id}>
            <img src={'/' + tea.image} alt={tea.name} />
            <h2>{tea.name}</h2>
            <p>{tea.benefit}</p>
            <h3>¥{tea.price}</h3>
            <button onClick={() => onAddToCart(tea._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeaCollection;