import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../components/BottomNav';
import './CourseDetail.css';

const courseDetails = {
  1: {
    description: 'Master the fundamentals and advanced concepts in this comprehensive course. Learn from industry experts with real-world projects and hands-on exercises. Perfect for beginners and intermediate learners looking to advance their skills.',
    whatYouLearn: [
      'Build real-world projects',
      'Master core concepts',
      'Write clean, efficient code',
      'Deploy applications to cloud',
      'Work with databases',
      'Build REST APIs'
    ],
    syllabus: [
      { section: 'Section 1', title: 'Introduction to Web Development', lessons: 5 },
      { section: 'Section 2', title: 'HTML & CSS Fundamentals', lessons: 8 },
      { section: 'Section 3', title: 'JavaScript Basics', lessons: 10 },
      { section: 'Section 4', title: 'React Framework', lessons: 12 },
      { section: 'Section 5', title: 'Node.js & Express', lessons: 7 },
    ],
    reviews: [
      { name: 'John D.', rating: 5, comment: 'Excellent course! Very well structured.' },
      { name: 'Maria S.', rating: 5, comment: 'Best investment I made this year!' },
      { name: 'Alex K.', rating: 4, comment: 'Great content, very detailed.' },
    ],
    students: 45230,
    lessons: 42,
    level: 'Beginner',
    instructor_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  },
  2: {
    description: 'Learn the complete UI/UX design process from wireframing to final design. Master industry tools and create stunning user interfaces that users love.',
    whatYouLearn: [
      'Design stunning UI interfaces',
      'Master Figma tool',
      'Create wireframes & prototypes',
      'Understand UX principles',
      'Build design systems',
      'Conduct user research'
    ],
    syllabus: [
      { section: 'Section 1', title: 'Design Thinking', lessons: 4 },
      { section: 'Section 2', title: 'Wireframing Basics', lessons: 6 },
      { section: 'Section 3', title: 'Figma Mastery', lessons: 10 },
      { section: 'Section 4', title: 'Prototyping', lessons: 8 },
    ],
    reviews: [
      { name: 'Sophie L.', rating: 5, comment: 'Amazing design course!' },
      { name: 'Tom B.', rating: 4, comment: 'Very practical and hands-on.' },
    ],
    students: 32100,
    lessons: 28,
    level: 'Intermediate',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  },
  3: {
    description: 'Build complete full-stack applications using React and Node.js. Learn modern development practices and deploy your apps to production.',
    whatYouLearn: [
      'Build full-stack apps',
      'React advanced patterns',
      'Node.js REST APIs',
      'MongoDB database',
      'Authentication & Security',
      'Cloud deployment'
    ],
    syllabus: [
      { section: 'Section 1', title: 'React Advanced', lessons: 10 },
      { section: 'Section 2', title: 'Node & Express', lessons: 12 },
      { section: 'Section 3', title: 'MongoDB', lessons: 8 },
      { section: 'Section 4', title: 'Full Stack Projects', lessons: 15 },
    ],
    reviews: [
      { name: 'Dev R.', rating: 5, comment: 'Best full-stack course out there!' },
      { name: 'Lisa M.', rating: 5, comment: 'Highly recommended!' },
    ],
    students: 58900,
    lessons: 55,
    level: 'Advanced',
    instructor_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
  },
  4: {
    description: 'Learn digital marketing strategies that actually work. From SEO to social media, email marketing to paid ads — master every channel.',
    whatYouLearn: [
      'SEO optimization',
      'Social media marketing',
      'Email campaigns',
      'Google & Facebook Ads',
      'Content marketing',
      'Analytics & reporting'
    ],
    syllabus: [
      { section: 'Section 1', title: 'Digital Marketing Basics', lessons: 5 },
      { section: 'Section 2', title: 'SEO Mastery', lessons: 7 },
      { section: 'Section 3', title: 'Social Media', lessons: 6 },
      { section: 'Section 4', title: 'Paid Advertising', lessons: 8 },
    ],
    reviews: [
      { name: 'Emma W.', rating: 4, comment: 'Very practical strategies!' },
      { name: 'Chris P.', rating: 5, comment: 'Great ROI on this course!' },
    ],
    students: 21400,
    lessons: 20,
    level: 'Beginner',
    instructor_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  },
  5: {
    description: 'Master Python for data science, machine learning and data analysis. Work with real datasets and build predictive models.',
    whatYouLearn: [
      'Python programming',
      'Data analysis with Pandas',
      'Data visualization',
      'Machine learning basics',
      'Statistical analysis',
      'Real-world projects'
    ],
    syllabus: [
      { section: 'Section 1', title: 'Python Fundamentals', lessons: 8 },
      { section: 'Section 2', title: 'Data Analysis', lessons: 10 },
      { section: 'Section 3', title: 'Visualization', lessons: 6 },
      { section: 'Section 4', title: 'Machine Learning', lessons: 14 },
    ],
    reviews: [
      { name: 'Raj K.', rating: 5, comment: 'Perfect for beginners!' },
      { name: 'Anna T.', rating: 4, comment: 'Very comprehensive course.' },
    ],
    students: 38700,
    lessons: 38,
    level: 'Beginner',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100'
  }
};

export default function CourseDetail({ addToCart, cart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(r => setCourse(r.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!course) return <div className="cd-loading">Loading...</div>;

  const details = courseDetails[parseInt(id)] || courseDetails[1];
  const alreadyInCart = cart && cart.find(c => c.id === course.id);

  return (
    <div className="cd-screen">

      <div className="cd-hero">
        <img src={course.image} alt={course.title} className="cd-hero-img" />
        <div className="cd-hero-overlay">
          <button className="cd-back" onClick={() => navigate(-1)}>←</button>
          <div className="cd-hero-actions">
            <button
              className={`cd-action-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              {liked ? '❤️' : '🤍'}
            </button>
            <button className="cd-action-btn">🔗</button>
          </div>
        </div>
        <span className="cd-category-badge">{course.category}</span>
      </div>

      <div className="cd-content">

        <h1 className="cd-title">{course.title}</h1>

        <div className="cd-rating-row">
          <span className="cd-star">⭐ {course.rating}</span>
          <span className="cd-reviews">({course.reviews?.toLocaleString()} reviews)</span>
          <span className="cd-students">👥 {details.students?.toLocaleString()} students</span>
        </div>

        <div className="cd-instructor-box">
          <img src={details.instructor_avatar} alt="instructor" className="cd-inst-avatar" />
          <div>
            <p className="cd-inst-label">Instructor</p>
            <p className="cd-inst-name">{course.instructor}</p>
          </div>
        </div>

        <div className="cd-info-grid">
          <div className="cd-info-item blue">
            <span className="cd-info-icon">⏱</span>
            <span className="cd-info-val">{course.duration}</span>
          </div>
          <div className="cd-info-item green">
            <span className="cd-info-icon">📊</span>
            <span className="cd-info-val">{details.level}</span>
          </div>
          <div className="cd-info-item purple">
            <span className="cd-info-icon">▶️</span>
            <span className="cd-info-val">{details.lessons} Lessons</span>
          </div>
        </div>

        <div className="cd-tabs">
          {['Overview', 'Syllabus', 'Reviews'].map(tab => (
            <button
              key={tab}
              className={`cd-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="cd-tab-content">
            <h3>About This Course</h3>
            <p className="cd-desc">{details.description}</p>
            <h3>What You'll Learn</h3>
            <div className="cd-learn-list">
              {details.whatYouLearn.map((item, i) => (
                <div key={i} className="cd-learn-item">
                  <span className="cd-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Syllabus' && (
          <div className="cd-tab-content">
            {details.syllabus.map((s, i) => (
              <div key={i} className="cd-syllabus-item">
                <div className="cd-syllabus-left">
                  <span className="cd-section-num">{i + 1}</span>
                  <div>
                    <p className="cd-section-label">{s.section}</p>
                    <p className="cd-section-title">{s.title}</p>
                  </div>
                </div>
                <span className="cd-lessons-count">{s.lessons} lessons</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="cd-tab-content">
            <div className="cd-rating-big">
              <span className="cd-rating-num">{course.rating}</span>
              <div>
                <div className="cd-stars">
                  {'⭐'.repeat(Math.floor(course.rating))}
                </div>
                <p>{course.reviews?.toLocaleString()} reviews</p>
              </div>
            </div>
            {details.reviews.map((r, i) => (
              <div key={i} className="cd-review-item">
                <div className="cd-reviewer">
                  <div className="cd-reviewer-avatar">{r.name.charAt(0)}</div>
                  <div>
                    <p className="cd-reviewer-name">{r.name}</p>
                    <span>{'⭐'.repeat(r.rating)}</span>
                  </div>
                </div>
                <p className="cd-review-text">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="cd-bottom-bar">
        <div className="cd-price-wrap">
          <span className="cd-price">₹{course.price}</span>
          <span className="cd-original">₹{course.originalPrice}</span>
        </div>
        <button
          className={`cd-enroll-btn ${alreadyInCart ? 'in-cart' : ''}`}
          onClick={() => {
            if (alreadyInCart) {
              navigate('/cart');
            } else {
              addToCart(course);
              navigate('/cart');
            }
          }}
        >
          {alreadyInCart ? '✅ Go to Cart' : '🛒 Add to Cart'}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}