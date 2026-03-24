import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Profile.css';

export default function Profile({ user }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile/1')
      .then(r => setProfile(r.data))
      .catch(err => console.log(err));
  }, []);

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-screen">

      <div className="profile-header">
        <h2>My Profile</h2>
        <button
          className="settings-btn"
          onClick={() => navigate('/settings')}
        >
          ⚙️
        </button>
      </div>

      <div className="avatar-wrap">
        <img src={profile.avatar} alt="avatar" className="avatar" />
      </div>

      <div className="profile-card">
        <div className="profile-info">
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <span className="role-badge">{profile.role}</span>
        </div>

        <div className="stats-grid">
          <div
            className="stat-box purple"
            onClick={() => navigate('/stats/enrolled')}
            style={{ cursor: 'pointer' }}
          >
            <span className="stat-icon">📖</span>
            <strong>{profile.stats.enrolled}</strong>
            <span>Courses Enrolled</span>
          </div>
          <div
            className="stat-box green"
            onClick={() => navigate('/stats/completed')}
            style={{ cursor: 'pointer' }}
          >
            <span className="stat-icon">🏆</span>
            <strong>{profile.stats.completed}</strong>
            <span>Certificates</span>
          </div>
          <div
            className="stat-box blue"
            onClick={() => navigate('/stats/learning')}
            style={{ cursor: 'pointer' }}
          >
            <span className="stat-icon">⏱</span>
            <strong>{profile.stats.learningTime}</strong>
            <span>Learning Time</span>
          </div>
          <div
            className="stat-box orange"
            onClick={() => navigate('/stats/learning')}
            style={{ cursor: 'pointer' }}
          >
            <span className="stat-icon">📈</span>
            <strong>{profile.stats.streak}</strong>
            <span>Day Streak</span>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h3>Recent Achievements</h3>
        {profile.achievements.map(a => (
          <div key={a.id} className="achievement-item">
            <div className="ach-icon" style={{ background: a.color }}>🎖</div>
            <div>
              <p className="ach-title">{a.title}</p>
              <p className="ach-desc">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="profile-actions">
        <button
          className="profile-action-btn"
          onClick={() => navigate('/my-courses')}
        >
          📚 My Courses
        </button>
        <button
          className="profile-action-btn"
          onClick={() => navigate('/stats/enrolled')}
        >
          📊 My Progress
        </button>
        <button
          className="profile-action-btn"
          onClick={() => navigate('/notifications')}
        >
          🔔 Notifications
        </button>
        <button
          className="profile-action-btn"
          onClick={() => navigate('/settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      <div style={{ height: 80 }}></div>
      <BottomNav />
    </div>
  );
}