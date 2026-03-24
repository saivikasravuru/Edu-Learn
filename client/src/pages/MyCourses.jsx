import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import './MyCourses.css';

const allCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    category: 'Development',
    progress: 65,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
    status: 'inprogress'
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    instructor: 'Michael Chen',
    category: 'Design',
    progress: 32,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    status: 'inprogress'
  },
  {
    id: 3,
    title: 'Data Science with Python',
    instructor: 'Dr. Emily Roberts',
    category: 'Data Science',
    progress: 88,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
    status: 'inprogress'
  },
  {
    id: 4,
    title: 'React & Node Full Stack',
    instructor: 'Emma Davis',
    category: 'Development',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    status: 'completed'
  },
  {
    id: 5,
    title: 'Digital Marketing Strategy',
    instructor: 'James Wilson',
    category: 'Business',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    status: 'completed'
  }
];

const tabs = ['All Courses', 'In Progress', 'Completed'];

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState('All Courses');

  const filtered = allCourses.filter(c => {
    if (activeTab === 'All Courses') return true;
    if (activeTab === 'In Progress') return c.status === 'inprogress';
    if (activeTab === 'Completed') return c.status === 'completed';
    return true;
  });

  const active = allCourses.filter(c => c.status === 'inprogress').length;
  const avgProgress = Math.round(
    allCourses.reduce((sum, c) => sum + c.progress, 0) / allCourses.length
  );

  return (
    <div className="mycourses-screen">

      <div className="mycourses-header">
        <h2>My Courses</h2>
        <p>Continue your learning journey</p>
      </div>

      <div className="mc-stats-row">
        <div className="mc-stat">
          <span className="mc-stat-val green">{active}</span>
          <span>Active</span>
        </div>
        <div className="mc-stat-div"></div>
        <div className="mc-stat">
          <span className="mc-stat-val blue">{avgProgress}%</span>
          <span>Avg Progress</span>
        </div>
        <div className="mc-stat-div"></div>
        <div className="mc-stat">
          <span className="mc-stat-val purple">24h</span>
          <span>This Week</span>
        </div>
      </div>

      <div className="mc-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`mc-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mc-list">
        {filtered.map(course => (
          <div key={course.id} className="mc-card">
            <div className="mc-card-left">
              <div className="mc-img-wrap">
                <img src={course.image} alt={course.title} />
                <div className="mc-play">▶</div>
              </div>
            </div>
            <div className="mc-card-right">
              <span className="mc-badge">{course.category}</span>
              <h4>{course.title}</h4>
              <div className="mc-instructor">
                <div className="mc-avatar">
                  {course.instructor.charAt(0)}
                </div>
                <span>{course.instructor}</span>
              </div>
              <div className="mc-progress-row">
                <span>Progress</span>
                <span className={`mc-percent ${course.progress === 100 ? 'done' : ''}`}>
                  {course.progress}%
                </span>
              </div>
              <div className="mc-progress-bar">
                <div
                  className="mc-progress-fill"
                  style={{ width: `${course.progress}%` }}
                ></div>
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