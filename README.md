# 🎓 Edu-Learn 

Edu-Learn is a full-stack e-learning web application built using the **MERN stack (MongoDB, Express, React, Node.js)**. The platform allows users to explore courses, manage profiles, and enroll in learning programs.

---

## 🚀 Features

* 🔐 User Authentication (Login / Signup)
* 📚 Browse available courses
* 🛒 Course enrollment system
* 👤 User profile management
* 📊 Track enrolled courses
* 🔄 Dual data storage (MongoDB + JSON fallback)

---

## 🛠️ Tech Stack

### Frontend (Client)

* React.js
* JavaScript (ES6+)
* HTML5 & CSS3

### Backend (Server)

* Node.js
* Express.js

### Database

* MongoDB (Primary database)
* JSON files (Fallback for testing and lightweight storage)

---

## 📁 Project Structure

```
Edu-Learn/
│
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── server/                 # Node + Express Backend
│   ├── data/               # JSON storage
│   │   ├── users.json
│   │   └── enrollments.json
│   ├── models/             # MongoDB models
│   │   └── User.js
│   ├── routes/             # Express routes
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── profile.js
│   ├── crud_operations.js
│   ├── index.js            # Entry point (Express server)
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```
git clone https://github.com/saivikasravuru/Edu-Learn.git
cd Edu-Learn
```

---

### 2. Setup Backend (Server)

```
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend server:

```
node index.js
```

---

### 3. Setup Frontend (Client)

```
cd client
npm install
npm start
```

---

## 🌐 Application URLs

* Frontend: http://localhost:3000
* Backend: http://localhost:5000

---

## 📌 Key Highlights

* Full-stack MERN architecture
* RESTful API development using Express
* Modular code structure (client & server separation)
* Dual database approach (MongoDB + JSON)
* Scalable and beginner-friendly design

---

## 🔮 Future Enhancements

* 💳 Payment integration (Razorpay / Stripe)
* 🧑‍🏫 Admin dashboard
* 🎥 Video streaming support
* 🌍 Deployment (Vercel + Render)

---

## 👨‍💻 Author

**Sai Vikas Ravuru**
🔗 GitHub: https://github.com/saivikasravuru

---

## 📄 License

This project is licensed under the MIT License.

---
