import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      setUser(res.data.user);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-header">
        <div className="app-logo">📚</div>
        <h1>EduLearn</h1>
        <p>Learn Anytime, Anywhere</p>
      </div>

      <div className="login-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>

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
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {error && <p className="error-msg">⚠️ {error}</p>}

<button
  type="button"
  className="btn-forgot"
  onClick={() => navigate('/forgot-password')}
>
  Forgot Password?
</button>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

<p className="signup-text">
  Don't have an account?{' '}
  <span className="link" onClick={() => navigate('/signup')}>Sign Up</span>
</p>
      </div>

      <p className="footer-text">© 2025 EduLearn. All rights reserved.</p>
    </div>
  );
}