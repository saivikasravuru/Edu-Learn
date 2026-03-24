const express = require('express');
const router = express.Router();

// ✅ GET /api/profile/:id — Get user profile
router.get('/:id', (req, res) => {
  res.json({
    id: 1,
    name: 'Alex Student',
    email: 'alex.student@email.com',
    role: 'Premium Member',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100',
    stats: {
      enrolled: 12,
      completed: 8,
      learningTime: '142h',
      streak: 24
    },
    achievements: [
      {
        id: 1,
        title: 'Web Development Pro',
        desc: 'Completed 5 web development courses',
        color: '#FEF3C7'
      },
      {
        id: 2,
        title: 'Consistency Champion',
        desc: '24-day learning streak',
        color: '#DBEAFE'
      },
      {
        id: 3,
        title: 'Quick Learner',
        desc: 'Completed a course in one week',
        color: '#D1FAE5'
      }
    ]
  });
});

module.exports = router;