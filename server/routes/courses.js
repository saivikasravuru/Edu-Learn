const express = require('express');
const router = express.Router();

const courses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    category: 'Development',
    rating: 4.8,
    reviews: 12450,
    price: 4149,
    originalPrice: 8299,
    duration: '42 hours',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400'
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    instructor: 'Mike Chen',
    category: 'Design',
    rating: 4.7,
    reviews: 8320,
    price: 3319,
    originalPrice: 6639,
    duration: '28 hours',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
  },
  {
    id: 3,
    title: 'React & Node Full Stack',
    instructor: 'Emma Davis',
    category: 'Development',
    rating: 4.9,
    reviews: 15600,
    price: 4979,
    originalPrice: 9959,
    duration: '55 hours',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
  },
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    instructor: 'James Wilson',
    category: 'Business',
    rating: 4.6,
    reviews: 5430,
    price: 2899,
    originalPrice: 5799,
    duration: '20 hours',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
  },
  {
    id: 5,
    title: 'Python for Data Science',
    instructor: 'Lisa Park',
    category: 'Development',
    rating: 4.8,
    reviews: 9870,
    price: 3729,
    originalPrice: 7459,
    duration: '38 hours',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
  }
];

// ✅ GET /api/courses
router.get('/', (req, res) => {
  res.json(courses);
});

// ✅ GET /api/courses/:id
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.json(course);
});

module.exports = router;