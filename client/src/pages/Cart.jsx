import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Cart.css';

export default function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  const originalTotal = cart.reduce((sum, c) => sum + c.originalPrice, 0);
  const savings = originalTotal - total;

  return (
    <div className="cart-screen">
      <div className="cart-header">
        <button className="cart-back" onClick={() => navigate(-1)}>←</button>
        <h2>My Cart</h2>
        <span className="cart-count">{cart.length} items</span>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div style={{ fontSize: 70 }}>🛒</div>
          <h3>Your cart is empty!</h3>
          <p>Browse courses and add them to your cart</p>
          <button className="browse-btn" onClick={() => navigate('/home')}>
            Browse Courses
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(course => (
              <div key={course.id} className="cart-item">
                <img src={course.image} alt={course.title} className="cart-img" />
                <div className="cart-item-info">
                  <span className="cart-badge">{course.category}</span>
                  <h4>{course.title}</h4>
                  <p>👤 {course.instructor}</p>
                  <div className="cart-price-row">
                    <span className="cart-price">₹{course.price}</span>
                    <span className="cart-original">₹{course.originalPrice}</span>
                  </div>
                </div>
                <button
                  className="cart-remove"
                  onClick={() => removeFromCart(course.id)}
                >✕</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Original Price</span>
              <span>₹{originalTotal}</span>
            </div>
            <div className="summary-row green">
              <span>You Save</span>
              <span>- ₹{savings}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="cart-checkout">
            <div>
              <p className="checkout-total-label">Total Amount</p>
              <p className="checkout-total">₹{total}</p>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate('/payment')}
            >
              Proceed to Pay →
            </button>
          </div>
        </>
      )}

      <div style={{ height: 80 }}></div>
      <BottomNav />
    </div>
  );
}