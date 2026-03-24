import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './AllCourses.css';

const categories = ['All', 'Development', 'Design', 'Business'];

export default function AllCourses({ cart, addToCart }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(r => setCourses(r.data))
      .catch(err => console.log(err));
  }, []);

  const filtered = courses
    .filter(c =>
      (activeCategory === 'All' || c.category === activeCategory) &&
      c.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'popular') return b.reviews - a.reviews;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price_low') return a.price - b.price;
      if (sort === 'price_high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="all-screen">

      <div className="all-header">
        <button className="all-back" onClick={() => navigate('/home')}>←</button>
        <h2>All Courses</h2>
        <span className="all-count">{filtered.length} courses</span>
      </div>

      <div className="all-search">
        <span>🔍</span>
        <input
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="all-filters">
        <div className="cat-scroll">
          {categories.map(c => (
            <button
              key={c}
              className={`all-cat-btn ${activeCategory === c ? 'active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>

      <div className="all-list">
        {filtered.length === 0 ? (
          <div className="all-empty">
            <div style={{ fontSize: 50 }}>🔍</div>
            <h3>No courses found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          filtered.map(course => (
            <div
              key={course.id}
              className="all-card"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <img src={course.image} alt={course.title} className="all-img" />
              <div className="all-card-body">
                <div className="all-card-top">
                  <span className="all-badge">{course.category}</span>
                  <span className="all-rating">⭐ {course.rating}</span>
                </div>
                <h4 className="all-title">{course.title}</h4>
                <p className="all-instructor">👤 {course.instructor}</p>
                <div className="all-card-footer">
                  <div>
                    <span className="all-price">₹{course.price}</span>
                    <span className="all-original">₹{course.originalPrice}</span>
                  </div>
                  <span className="all-duration">⏱ {course.duration}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ height: 80 }}></div>
      <BottomNav />
    </div>
  );
}