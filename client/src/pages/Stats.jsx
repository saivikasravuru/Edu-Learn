import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Stats.css';

const enrolledCourses = [
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
    title: 'React & Node Full Stack',
    instructor: 'Emma Davis',
    category: 'Development',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    instructor: 'James Wilson',
    category: 'Business',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    status: 'completed'
  },
  {
    id: 5,
    title: 'Python for Data Science',
    instructor: 'Lisa Park',
    category: 'Development',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
    status: 'inprogress'
  }
];

const learningData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3.5 },
  { day: 'Wed', hours: 1 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 5 },
  { day: 'Sun', hours: 3 },
];

const maxHours = Math.max(...learningData.map(d => d.hours));

export default function Stats() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [activeTab, setActiveTab] = useState(type || 'enrolled');

  const completed = enrolledCourses.filter(c => c.status === 'completed');
  const inProgress = enrolledCourses.filter(c => c.status === 'inprogress');
  const totalHours = learningData.reduce((sum, d) => sum + d.hours, 0);

  const getTitle = () => {
    if (activeTab === 'enrolled') return 'Enrolled Courses';
    if (activeTab === 'completed') return 'Completed Courses';
    return 'Learning Time';
  };

  const getCourses = () => {
    if (activeTab === 'enrolled') return enrolledCourses;
    if (activeTab === 'completed') return completed;
    return [];
  };

  return (
    <div className="stats-screen">

      <div className="stats-header">
        <button className="stats-back" onClick={() => navigate('/home')}>←</button>
        <h2>{getTitle()}</h2>
      </div>

      <div className="stats-tabs">
        <button
          className={`stats-tab ${activeTab === 'enrolled' ? 'active' : ''}`}
          onClick={() => setActiveTab('enrolled')}
        >
          📚 Enrolled ({enrolledCourses.length})
        </button>
        <button
          className={`stats-tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          ✅ Completed ({completed.length})
        </button>
        <button
          className={`stats-tab ${activeTab === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveTab('learning')}
        >
          ⏱ Learning
        </button>
      </div>

      {activeTab === 'learning' ? (
        <div className="learning-section">
          <div className="learning-summary">
            <div className="learning-stat purple">
              <span className="ls-val">45h</span>
              <span className="ls-label">This Month</span>
            </div>
            <div className="learning-stat green">
              <span className="ls-val">{totalHours.toFixed(1)}h</span>
              <span className="ls-label">This Week</span>
            </div>
            <div className="learning-stat orange">
              <span className="ls-val">24</span>
              <span className="ls-label">Day Streak</span>
            </div>
          </div>

          <div className="chart-card">
            <h3>Weekly Activity</h3>
            <div className="bar-chart">
              {learningData.map((d, i) => (
                <div key={i} className="bar-col">
                  <span className="bar-val">{d.hours}h</span>
                  <div className="bar-wrap">
                    <div
                      className="bar-fill"
                      style={{ height: `${(d.hours / maxHours) * 100}%` }}
                    ></div>
                  </div>
                  <span className="bar-day">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="streak-card">
            <h3>🔥 24 Day Streak!</h3>
            <p>Keep learning every day to maintain your streak</p>
            <div className="streak-days">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={`streak-dot ${i < 24 ? 'active' : ''} ${i === 23 ? 'today' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="stats-course-list">
          {getCourses().length === 0 ? (
            <div className="stats-empty">
              <div style={{ fontSize: 50 }}>📚</div>
              <h3>No courses here yet!</h3>
              <p>Start learning to see your progress</p>
              <button className="browse-courses-btn" onClick={() => navigate('/home')}>
                Browse Courses
              </button>
            </div>
          ) : (
            getCourses().map(course => (
              <div
                key={course.id}
                className="stats-course-card"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <img src={course.image} alt={course.title} className="stats-course-img" />
                <div className="stats-course-info">
                  <span className="stats-course-badge">{course.category}</span>
                  <h4>{course.title}</h4>
                  <p>👤 {course.instructor}</p>
                  <div className="stats-progress-row">
                    <div className="stats-progress-bar">
                      <div
                        className="stats-progress-fill"
                        style={{
                          width: `${course.progress}%`,
                          background: course.progress === 100
                            ? 'linear-gradient(90deg, #00B894, #00cec9)'
                            : 'linear-gradient(90deg, #6C5CE7, #8B7CF6)'
                        }}
                      ></div>
                    </div>
                    <span
                      className="stats-progress-pct"
                      style={{ color: course.progress === 100 ? '#00B894' : '#6C5CE7' }}
                    >
                      {course.progress === 100 ? '✅ Done' : `${course.progress}%`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div style={{ height: 80 }}></div>
      <BottomNav />
    </div>
  );
}