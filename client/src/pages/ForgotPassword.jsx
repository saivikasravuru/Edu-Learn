import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [serverOtp, setServerOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── STEP 1: Send OTP ──
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter your email'); return; }
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email }
      );
      setServerOtp(res.data.otp);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Email not found!');
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2: Verify OTP ──
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setError('Please enter complete OTP');
      return;
    }
    if (enteredOtp !== serverOtp) {
      setError('Invalid OTP! Check your email');
      return;
    }
    setStep(3);
  };

  const handleResendOtp = async () => {
    setOtp(['', '', '', '']);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email }
      );
      setServerOtp(res.data.otp);
      alert('OTP resent! Use 1234 for demo');
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  // ── STEP 3: Reset Password ──
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/api/auth/reset-password',
        { email, newPassword }
      );
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-screen">

      <div className="fp-header">
        <button
          className="fp-back"
          onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
        >←</button>
        <h2>
          {step === 1 && 'Forgot Password'}
          {step === 2 && 'Verify OTP'}
          {step === 3 && 'New Password'}
          {step === 4 && 'All Done!'}
        </h2>
      </div>

      <div className="fp-progress">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="fp-progress-step">
            <div className={`fp-step-circle ${step >= s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
              {step > s ? '✓' : s}
            </div>
            {s < 4 && (
              <div className={`fp-step-line ${step > s ? 'active' : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="fp-body">

        {/* ── STEP 1: Email ── */}
        {step === 1 && (
          <div className="fp-card">
            <div className="fp-icon-wrap">📧</div>
            <h3>Enter your Email</h3>
            <p>We'll send a verification code to your registered email address</p>
            <form onSubmit={handleSendOtp}>
              <div className="fp-input-group">
                <label>Email Address</label>
                <div className="fp-input-wrap">
                  <span>✉️</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <p className="fp-error">⚠️ {error}</p>}
              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP →'}
              </button>
            </form>
            <p className="fp-link-text">
              Remember password?{' '}
              <span className="fp-link" onClick={() => navigate('/')}>Login</span>
            </p>
          </div>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 2 && (
          <div className="fp-card">
            <div className="fp-icon-wrap">🔐</div>
            <h3>Enter OTP</h3>
            <p>We sent a 4-digit code to <strong>{email}</strong></p>
            <p className="fp-demo-note">🎯 Demo OTP: <strong>1234</strong></p>
            <form onSubmit={handleVerifyOtp}>
              <div className="otp-boxes">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(index, e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !otp[index] && index > 0) {
                        document.getElementById(`otp-${index - 1}`).focus();
                      }
                    }}
                    className={`otp-box ${digit ? 'filled' : ''}`}
                  />
                ))}
              </div>
              {error && <p className="fp-error">⚠️ {error}</p>}
              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP →'}
              </button>
            </form>
            <div className="fp-resend">
              <span>Didn't receive OTP? </span>
              <span className="fp-link" onClick={handleResendOtp}>Resend</span>
            </div>
          </div>
        )}

        {/* ── STEP 3: New Password ── */}
        {step === 3 && (
          <div className="fp-card">
            <div className="fp-icon-wrap">🔑</div>
            <h3>Create New Password</h3>
            <p>Your new password must be at least 6 characters long</p>
            <form onSubmit={handleResetPassword}>
              <div className="fp-input-group">
                <label>New Password</label>
                <div className="fp-input-wrap">
                  <span>🔒</span>
                  <input
                    type={showNew ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="fp-eye"
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>
              <div className="fp-input-group">
                <label>Confirm Password</label>
                <div className="fp-input-wrap">
                  <span>🔒</span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="fp-eye"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>

              {newPassword && confirmPassword && (
                <p className={`fp-match ${newPassword === confirmPassword ? 'match' : 'no-match'}`}>
                  {newPassword === confirmPassword
                    ? '✅ Passwords match'
                    : '❌ Passwords do not match'}
                </p>
              )}

              {error && <p className="fp-error">⚠️ {error}</p>}

              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? 'Updating...' : 'Reset Password →'}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP 4: Success ── */}
        {step === 4 && (
          <div className="fp-card fp-success-card">
            <div className="fp-success-icon">✅</div>
            <h3>Password Reset!</h3>
            <p>
              Your password has been successfully updated and saved.
              You can now login with your new password.
            </p>
            <button className="fp-btn" onClick={() => navigate('/')}>
              Go to Login →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}