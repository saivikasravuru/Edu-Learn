import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

export default function Payment({ cart, setCart }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, c) => sum + c.price, 0);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setCart([]);
        navigate('/my-courses');
      }, 2500);
    }, 2000);
  };

  if (success) {
    return (
      <div className="payment-success">
        <div className="success-circle">✅</div>
        <h2>Payment Successful!</h2>
        <p>You have been enrolled in {cart.length} course{cart.length > 1 ? 's' : ''}!</p>
        <p className="success-sub">Redirecting to My Courses...</p>
      </div>
    );
  }

  return (
    <div className="payment-screen">
      <div className="payment-header">
        <button className="pay-back" onClick={() => navigate(-1)}>←</button>
        <h2>Payment</h2>
      </div>

      <div className="payment-body">

        <div className="order-box">
          <h3>Order Summary</h3>
          {cart.map(c => (
            <div key={c.id} className="order-item">
              <span>📚 {c.title.length > 28 ? c.title.slice(0, 28) + '...' : c.title}</span>
              <span>₹{c.price}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <h3 className="pay-method-title">Payment Method</h3>

        <div className="pay-methods">
          {[
            { id: 'upi', label: 'UPI', icon: '📱' },
            { id: 'card', label: 'Card', icon: '💳' },
            { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
          ].map(m => (
            <button
              key={m.id}
              className={`pay-method-btn ${method === m.id ? 'active' : ''}`}
              onClick={() => setMethod(m.id)}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {method === 'upi' && (
          <div className="pay-form">
            <div className="upi-apps">
              {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                <button key={app} className="upi-app-btn">{app}</button>
              ))}
            </div>
            <label>Or enter UPI ID</label>
            <div className="pay-input-wrap">
              <span>📱</span>
              <input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
              />
            </div>
          </div>
        )}

        {method === 'card' && (
          <div className="pay-form">
            <label>Card Number</label>
            <div className="pay-input-wrap">
              <span>💳</span>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                maxLength={19}
                onChange={e => setCardNumber(e.target.value)}
              />
            </div>
            <label>Cardholder Name</label>
            <div className="pay-input-wrap">
              <span>👤</span>
              <input
                type="text"
                placeholder="Name on card"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
              />
            </div>
            <div className="card-row">
              <div className="card-half">
                <label>Expiry</label>
                <div className="pay-input-wrap">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    maxLength={5}
                    onChange={e => setExpiry(e.target.value)}
                  />
                </div>
              </div>
              <div className="card-half">
                <label>CVV</label>
                <div className="pay-input-wrap">
                  <input
                    type="password"
                    placeholder="•••"
                    value={cvv}
                    maxLength={3}
                    onChange={e => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {method === 'netbanking' && (
          <div className="pay-form">
            <div className="bank-grid">
              {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map(bank => (
                <button key={bank} className="bank-btn">{bank}</button>
              ))}
            </div>
          </div>
        )}

        <div className="secure-badge">
          🔒 100% Secure Payment · SSL Encrypted
        </div>

      </div>

      <div className="pay-bottom">
        <div>
          <p className="pay-total-label">Total Amount</p>
          <p className="pay-total">₹{total}</p>
        </div>
        <button
          className="pay-btn"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? (
            <span className="paying-text">Processing...</span>
          ) : (
            `Pay ₹${total}`
          )}
        </button>
      </div>
    </div>
  );
}