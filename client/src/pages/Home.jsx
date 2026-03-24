import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Home.css';

const categories = ['All', 'Development', 'Design', 'Business'];

export default function Home({ user, cart, addToCart, unreadCount }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(r => setCourses(r.data))
      .catch(err => console.log(err));
  }, []);

  const filtered = courses.filter(c =>
    (activeCategory === 'All' || c.category === activeCategory) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-screen">

      <div className="home-header">
        <div>
          <p className="welcome-sub">Welcome back,</p>
          <h2 className="welcome-name">{user.name}</h2>
        </div>
        <div className="header-icons">
          <button
            className="icon-btn"
            onClick={() => navigate('/cart')}
            style={{ position: 'relative' }}
          >
            🛒
            {cart && cart.length > 0 && (
              <span style={{
                position: 'absolute', top: '4px', right: '4px',
                width: '16px', height: '16px', background: '#e17055',
                borderRadius: '50%', fontSize: '9px', color: 'white',
                fontWeight: 900, display: 'flex', alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </button>
          <button
            className="icon-btn"
            onClick={() => navigate('/notifications')}
            style={{ position: 'relative' }}
          >
            🔔
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: '4px', right: '4px',
                width: '16px', height: '16px', background: '#e17055',
                borderRadius: '50%', fontSize: '9px', color: 'white',
                fontWeight: 900, display: 'flex', alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="search-bar">
        <span>🔍</span>
        <input
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="stats-row">
        <div
          className="stat-item"
          onClick={() => navigate('/stats/enrolled')}
          style={{ cursor: 'pointer' }}
        >
          <span className="stat-val blue">12</span>
          <span>Enrolled</span>
        </div>
        <div className="stat-div"></div>
        <div
          className="stat-item"
          onClick={() => navigate('/stats/completed')}
          style={{ cursor: 'pointer' }}
        >
          <span className="stat-val green">8</span>
          <span>Completed</span>
        </div>
        <div className="stat-div"></div>
        <div
          className="stat-item"
          onClick={() => navigate('/stats/learning')}
          style={{ cursor: 'pointer' }}
        >
          <span className="stat-val orange">45h</span>
          <span>Learning</span>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Categories</h3>
        <div className="category-list">
          {categories.map(c => (
            <button
              key={c}
              className={`cat-btn ${activeCategory === c ? 'active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Featured Courses</h3>
          <button
            className="see-all"
            onClick={() => navigate('/all-courses')}
          >
            See All
          </button>
        </div>
        <div className="course-list">
          {filtered.map(course => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => navigate(`/course/${course.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={course.image} alt={course.title} className="course-img" />
              <div className="course-body">
                <div className="course-meta">
                  <span className="badge">{course.category}</span>
                  <span className="rating">
                    ⭐ {course.rating} ({course.reviews.toLocaleString()})
                  </span>
                </div>
                <h4 className="course-title">{course.title}</h4>
                <p className="course-instructor">👤 {course.instructor}</p>
                <div className="course-footer">
                  <div>
                    <span className="price">₹{course.price}</span>
                    <span className="original">₹{course.originalPrice}</span>
                  </div>
                  <span className="duration">⏱ {course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 80 }}></div>
      <BottomNav />
    </div>
  );
}