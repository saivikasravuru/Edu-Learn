import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

export default function Settings({ user, setUser }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const [profile, setProfile] = useState({
    name: user?.name || 'Alex Student',
    email: user?.email || 'alex.student@email.com',
    phone: '+91 98765 43210',
    bio: 'Passionate learner exploring web development and design.',
    location: 'Chennai, Tamil Nadu'
  });

  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: true,
    courseUpdates: true,
    liveClasses: true,
    promotions: false,
    weeklyReport: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showProgress: true,
    showCertificates: true
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setUser(null);
      navigate('/');
    }
  };

  const Toggle = ({ value, onChange }) => (
    <div
      className={`toggle ${value ? 'on' : ''}`}
      onClick={() => onChange(!value)}
    >
      <div className="toggle-ball"></div>
    </div>
  );

  return (
    <div className="settings-screen">

      <div className="settings-header">
        <button className="settings-back" onClick={() => navigate('/profile')}>←</button>
        <h2>Settings</h2>
      </div>

      <div className="settings-body">

        {/* ── EDIT PROFILE ── */}
        <div className="settings-section">
          <button
            className="settings-section-header"
            onClick={() => setActiveSection(activeSection === 'profile' ? null : 'profile')}
          >
            <div className="ss-left">
              <span className="ss-icon" style={{ background: '#EEF2FF' }}>👤</span>
              <div>
                <h3>Edit Profile</h3>
                <p>Update your personal information</p>
              </div>
            </div>
            <span className="ss-arrow">{activeSection === 'profile' ? '▲' : '▶'}</span>
          </button>

          {activeSection === 'profile' && (
            <div className="settings-content">
              <div className="field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="field-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="field-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="field-group">
                <label>Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={e => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
              <div className="field-group">
                <label>Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  rows={3}
                />
              </div>
              <button className="save-btn" onClick={handleSave}>
                {saved ? '✅ Saved!' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {/* ── NOTIFICATIONS ── */}
        <div className="settings-section">
          <button
            className="settings-section-header"
            onClick={() => setActiveSection(activeSection === 'notifications' ? null : 'notifications')}
          >
            <div className="ss-left">
              <span className="ss-icon" style={{ background: '#FEF3C7' }}>🔔</span>
              <div>
                <h3>Notifications</h3>
                <p>Manage your notification preferences</p>
              </div>
            </div>
            <span className="ss-arrow">{activeSection === 'notifications' ? '▲' : '▶'}</span>
          </button>

          {activeSection === 'notifications' && (
            <div className="settings-content">
              {[
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive app notifications' },
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Get updates via email' },
                { key: 'courseUpdates', label: 'Course Updates', desc: 'New lessons and content' },
                { key: 'liveClasses', label: 'Live Classes', desc: 'Reminders for live sessions' },
                { key: 'promotions', label: 'Promotions & Offers', desc: 'Deals and discounts' },
                { key: 'weeklyReport', label: 'Weekly Report', desc: 'Your learning summary' },
              ].map(item => (
                <div key={item.key} className="toggle-row">
                  <div>
                    <p className="toggle-label">{item.label}</p>
                    <p className="toggle-desc">{item.desc}</p>
                  </div>
                  <Toggle
                    value={notifications[item.key]}
                    onChange={val => setNotifications({ ...notifications, [item.key]: val })}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── PRIVACY ── */}
        <div className="settings-section">
          <button
            className="settings-section-header"
            onClick={() => setActiveSection(activeSection === 'privacy' ? null : 'privacy')}
          >
            <div className="ss-left">
              <span className="ss-icon" style={{ background: '#D1FAE5' }}>🔒</span>
              <div>
                <h3>Privacy</h3>
                <p>Control your privacy settings</p>
              </div>
            </div>
            <span className="ss-arrow">{activeSection === 'privacy' ? '▲' : '▶'}</span>
          </button>

          {activeSection === 'privacy' && (
            <div className="settings-content">
              {[
                { key: 'profileVisible', label: 'Public Profile', desc: 'Make your profile visible to others' },
                { key: 'showProgress', label: 'Show Progress', desc: 'Display course progress publicly' },
                { key: 'showCertificates', label: 'Show Certificates', desc: 'Display earned certificates' },
              ].map(item => (
                <div key={item.key} className="toggle-row">
                  <div>
                    <p className="toggle-label">{item.label}</p>
                    <p className="toggle-desc">{item.desc}</p>
                  </div>
                  <Toggle
                    value={privacy[item.key]}
                    onChange={val => setPrivacy({ ...privacy, [item.key]: val })}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── CHANGE PASSWORD ── */}
        <div className="settings-section">
          <button
            className="settings-section-header"
            onClick={() => setActiveSection(activeSection === 'password' ? null : 'password')}
          >
            <div className="ss-left">
              <span className="ss-icon" style={{ background: '#DBEAFE' }}>🔑</span>
              <div>
                <h3>Change Password</h3>
                <p>Update your account password</p>
              </div>
            </div>
            <span className="ss-arrow">{activeSection === 'password' ? '▲' : '▶'}</span>
          </button>

          {activeSection === 'password' && (
            <div className="settings-content">
              <div className="field-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className="field-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div className="field-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
              <button className="save-btn" onClick={handleSave}>
                {saved ? '✅ Updated!' : 'Update Password'}
              </button>
            </div>
          )}
        </div>

        {/* ── LANGUAGE ── */}
        <div className="settings-section">
          <button
            className="settings-section-header"
            onClick={() => setActiveSection(activeSection === 'language' ? null : 'language')}
          >
            <div className="ss-left">
              <span className="ss-icon" style={{ background: '#F3E8FF' }}>🌐</span>
              <div>
                <h3>Language & Region</h3>
                <p>Set your preferred language</p>
              </div>
            </div>
            <span className="ss-arrow">{activeSection === 'language' ? '▲' : '▶'}</span>
          </button>

          {activeSection === 'language' && (
            <div className="settings-content">
              <div className="field-group">
                <label>Language</label>
                <select className="settings-select">
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                  <option>Kannada</option>
                </select>
              </div>
              <div className="field-group">
                <label>Region</label>
                <select className="settings-select">
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <button className="save-btn" onClick={handleSave}>
                {saved ? '✅ Saved!' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {/* ── HELP & SUPPORT ── */}
        <div className="settings-section">
          <button
            className="settings-section-header"
            onClick={() => setActiveSection(activeSection === 'help' ? null : 'help')}
          >
            <div className="ss-left">
              <span className="ss-icon" style={{ background: '#FEF3C7' }}>💬</span>
              <div>
                <h3>Help & Support</h3>
                <p>FAQ, contact and feedback</p>
              </div>
            </div>
            <span className="ss-arrow">{activeSection === 'help' ? '▲' : '▶'}</span>
          </button>

          {activeSection === 'help' && (
            <div className="settings-content">
              {[
                { icon: '❓', label: 'FAQ', desc: 'Frequently asked questions' },
                { icon: '📧', label: 'Contact Support', desc: 'support@edulearn.com' },
                { icon: '⭐', label: 'Rate the App', desc: 'Share your feedback' },
                { icon: '📋', label: 'Terms of Service', desc: 'Read our terms' },
                { icon: '🛡', label: 'Privacy Policy', desc: 'How we protect your data' },
              ].map((item, i) => (
                <div key={i} className="help-row">
                  <span className="help-icon">{item.icon}</span>
                  <div>
                    <p className="help-label">{item.label}</p>
                    <p className="help-desc">{item.desc}</p>
                  </div>
                  <span className="help-arrow">▶</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── APP INFO ── */}
        <div className="app-info-box">
          <p>📚 EduLearn</p>
          <p>Version 1.0.0</p>
          <p>© 2025 EduLearn. All rights reserved.</p>
        </div>

        {/* ── LOGOUT ── */}
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>

      </div>
    </div>
  );
}