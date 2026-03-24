import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import Live from './pages/Live';
import CourseDetail from './pages/CourseDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Notifications from './pages/Notifications';
import AllCourses from './pages/AllCourses';
import Stats from './pages/Stats';
import './index.css';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Course Available!', message: 'React Advanced Patterns just launched', time: '2 min ago', read: false, icon: '🎓' },
    { id: 2, title: 'Payment Successful', message: 'Your enrollment was confirmed', time: '1 hour ago', read: false, icon: '✅' },
    { id: 3, title: 'Live Class Starting', message: 'React Hooks Deep Dive starts in 10 mins', time: '3 hours ago', read: true, icon: '🔴' },
    { id: 4, title: 'Course Completed!', message: 'You completed Digital Marketing', time: '1 day ago', read: true, icon: '🏆' },
    { id: 5, title: 'Special Offer!', message: '50% off on all Design courses today', time: '2 days ago', read: true, icon: '🎉' },
  ]);

  const addToCart = (course) => {
    setCart(prev => {
      if (prev.find(c => c.id === course.id)) return prev;
      return [...prev, course];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup setUser={setUser} />} />
          <Route path="/home" element={user ? <Home user={user} cart={cart} addToCart={addToCart} unreadCount={unreadCount} /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
          <Route path="/my-courses" element={user ? <MyCourses /> : <Navigate to="/" />} />
          <Route path="/live" element={user ? <Live /> : <Navigate to="/" />} />
          <Route path="/course/:id" element={user ? <CourseDetail addToCart={addToCart} cart={cart} /> : <Navigate to="/" />} />
          <Route path="/cart" element={user ? <Cart cart={cart} removeFromCart={removeFromCart} /> : <Navigate to="/" />} />
          <Route path="/payment" element={user ? <Payment cart={cart} setCart={setCart} /> : <Navigate to="/" />} />
          <Route path="/notifications" element={user ? <Notifications notifications={notifications} markAllRead={markAllRead} /> : <Navigate to="/" />} />
          <Route path="/all-courses" element={user ? <AllCourses cart={cart} addToCart={addToCart} /> : <Navigate to="/" />} />
          <Route path="/stats/:type" element={user ? <Stats /> : <Navigate to="/" />} />
          <Route path="/settings" element={user ? <Settings user={user} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;