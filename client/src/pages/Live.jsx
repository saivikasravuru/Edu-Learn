import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Live.css';

const liveNow = [
  {
    id: 1,
    title: 'React Hooks Deep Dive',
    instructor: 'Sarah Johnson',
    category: 'Development',
    viewers: 245,
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400'
  }
];

const upcoming = [
  {
    id: 2,
    title: 'Figma Design Workshop',
    instructor: 'Michael Chen',
    category: 'Design',
    time: '4:00 PM Today',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
  },
  {
    id: 3,
    title: 'Data Analytics with Python',
    instructor: 'Dr. Emily Roberts',
    category: 'Data Science',
    time: '6:00 PM Today',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
  },
  {
    id: 4,
    title: 'Node.js REST APIs',
    instructor: 'Emma Davis',
    category: 'Development',
    time: '8:00 PM Today',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
  }
];

export default function Live() {
  const navigate = useNavigate();
  const [reminded, setReminded] = useState([]);

  const toggleReminder = (id) => {
    setReminded(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="live-screen">

      <div className="live-header">
        <button className="back-btn" onClick={() => navigate('/home')}>←</button>
        <h2>Live Classes</h2>
      </div>

      <div className="live-section">
        <div className="live-section-title">
          <span className="live-dot"></span>
          <h3>Live Now</h3>
        </div>

        {liveNow.map(item => (
          <div key={item.id} className="live-card">
            <div className="live-img-wrap">
              <img src={item.image} alt={item.title} />
              <span className="live-badge">● LIVE</span>
              <span className="live-category">{item.category}</span>
              <span className="live-viewers">👥 {item.viewers}</span>
            </div>
            <div className="live-card-body">
              <h4>{item.title}</h4>
              <div className="live-meta">
                <div className="live-instructor">
                  <div className="live-avatar">
                    {item.instructor.charAt(0)}
                  </div>
                  <span>{item.instructor}</span>
                </div>
                <span className="live-duration">⏱ {item.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="live-section">
        <h3 className="upcoming-title">Upcoming</h3>

        {upcoming.map(item => (
          <div key={item.id} className="upcoming-card">
            <img src={item.image} alt={item.title} className="upcoming-img" />
            <div className="upcoming-body">
              <span className="upcoming-badge">{item.category}</span>
              <h4>{item.title}</h4>
              <div className="upcoming-instructor">
                <div className="live-avatar small">
                  {item.instructor.charAt(0)}
                </div>
                <span>{item.instructor}</span>
              </div>
              <div className="upcoming-footer">
                <span className="upcoming-time">⏱ {item.time}</span>
                <button
                  className={`reminder-btn ${reminded.includes(item.id) ? 'reminded' : ''}`}
                  onClick={() => toggleReminder(item.id)}
                >
                  {reminded.includes(item.id) ? '✅ Reminded' : 'Set Reminder'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 80 }}></div>
      <BottomNav />
    </div>
  );
}