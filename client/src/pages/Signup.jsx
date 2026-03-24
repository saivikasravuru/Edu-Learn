import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      setUser(res.data.user);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-screen">
      <div className="signup-header">
        <div className="app-logo">📚</div>
        <h1>EduLearn</h1>
        <p>Start Learning Today</p>
      </div>

      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="signup-subtitle">Join thousands of learners worldwide</p>

        <form onSubmit={handleSignup}>

          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrap">
              <span className="icon">👤</span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <div className="input-wrap">
              <span className="icon">✉️</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrap">
              <span className="icon">🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrap">
              <span className="icon">🔒</span>
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <span className="toggle-pass" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {password && confirmPassword && (
            <div className="password-match">
              {password === confirmPassword
                ? <span className="match">✅ Passwords match</span>
                : <span className="no-match">❌ Passwords do not match</span>
              }
            </div>
          )}

          {error && <p className="error-msg">⚠️ {error}</p>}

          <div className="terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <span className="link">Terms</span> and <span className="link">Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="btn-signup" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        <p className="login-text">
          Already have an account?{' '}
          <span className="link" onClick={() => navigate('/')}>Login</span>
        </p>
      </div>

      <p className="footer-text">© 2025 EduLearn. All rights reserved.</p>
    </div>
  );
}