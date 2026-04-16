import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import { useLanguage } from '../LanguageContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const cardStyle = {
  hidePostalCode: true,
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#9e2146' },
  },
};

function CheckoutForm({ onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { cartTotal } = useCart();
  const { t } = useLanguage();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // Create payment intent on server
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.clientSecret) {
        setError(data.error || 'Failed to create payment');
        setProcessing(false);
        return;
      }

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm order on server
        const orderRes = await fetch('/api/orders/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, paymentIntentId: paymentIntent.id }),
        });
        const order = await orderRes.json();
        if (orderRes.ok) {
          onSuccess(order);
        } else {
          setError(order.error || 'Order confirmation failed');
        }
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout-form">
      <h3 className="stripe-form-title">{t.paymentDetails || 'Payment Details'}</h3>
      <div className="stripe-card-element">
        <CardElement options={cardStyle} />
      </div>
      {error && <div className="stripe-error">{error}</div>}
      <div className="stripe-form-total">
        <span>{t.cartTotal || 'Total'}</span>
        <span>¥{cartTotal.toLocaleString()}</span>
      </div>
      <div className="stripe-form-buttons">
        <button type="button" className="stripe-cancel-btn" onClick={onCancel} disabled={processing}>
          {t.cancel || 'Cancel'}
        </button>
        <button type="submit" className="stripe-pay-btn" disabled={!stripe || processing}>
          {processing ? (t.processing || 'Processing...') : (t.payNow || 'Pay Now')}
        </button>
      </div>
    </form>
  );
}

export default function StripeCheckout({ onSuccess, onCancel }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
  );
}
