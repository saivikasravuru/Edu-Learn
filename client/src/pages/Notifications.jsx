import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Notifications.css';

export default function Notifications({ notifications, markAllRead }) {
  const navigate = useNavigate();
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="notif-screen">
      <div className="notif-header">
        <button className="notif-back" onClick={() => navigate(-1)}>←</button>
        <h2>Notifications</h2>
        {unread > 0 && (
          <button className="mark-read-btn" onClick={markAllRead}>
            Mark all read
          </button>
        )}
      </div>

      {unread > 0 && (
        <div className="unread-banner">
          🔔 You have {unread} unread notification{unread > 1 ? 's' : ''}
        </div>
      )}

      <div className="notif-list">
        {notifications.map(n => (
          <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
            <div className="notif-icon">{n.icon}</div>
            <div className="notif-content">
              <h4>{n.title}</h4>
              <p>{n.message}</p>
              <span className="notif-time">🕐 {n.time}</span>
            </div>
            {!n.read && <div className="notif-dot"></div>}
          </div>
        ))}
      </div>

      <div style={{ height: 80 }}></div>
      <BottomNav />
    </div>
  );
}