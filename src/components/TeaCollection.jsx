import React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from '../LanguageContext';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import "./TeaCollection.css";

function TeaCollection() {
  const [teas, setTeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { isLoggedIn, requireLogin } = useAuth();

  useEffect(() => {
    fetch('/api/teas')
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

  if (loading) return <div className="tea-page"><h1 className="tea-title">{t.teaLoading}</h1></div>;

  return (
    <div className="tea-page">
      <h1 className="tea-title">{t.teaTitle}</h1>

      <div className="tea-container">
        {teas.map((tea) => (
          <div className="tea-card" key={tea._id}>
            <img src={'/' + tea.image} alt={t.teaNames[tea._id] || tea.name} />
            <h2>{t.teaNames[tea._id] || tea.name}</h2>
            <p>{t.teaBenefits[tea._id] || tea.benefit}</p>
            <h3>¥{tea.price}</h3>
            <button onClick={() => {
              if (!isLoggedIn) { requireLogin(); return; }
              addToCart({ id: tea._id, name: tea.name, price: tea.price, image: '/' + tea.image, type: 'tea' });
            }}>{t.addToCart}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeaCollection;
