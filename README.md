🩺 SafeMother — Maternal Health Support Platform
🌍 SDG 3: Good Health and Well-Being

Ensuring healthy lives and promoting well-being for all at all ages.

📖 Project Overview

SafeMother is a web-based maternal health support platform designed to provide expectant and nursing mothers with access to reliable health information, professional advice, and peer support.

The platform bridges the gap between healthcare providers and women who may lack access to accurate maternal health resources — promoting safe motherhood, awareness, and well-being.

Built using the MERN Stack, SafeMother demonstrates how digital innovation can advance SDG 3 (Good Health and Well-Being) by empowering women through technology and access to information.


🎯 Objectives

Provide verified maternal health education resources.

Enable midwives and health workers to share trusted advice.

Offer a safe space for mothers to ask questions and get reliable responses.

Promote early antenatal awareness and safe delivery practices.


🧱 Tech Stack
Layer	Technology
Frontend	React.js, TailwindCSS
Backend	Node.js, Express.js
Database	MongoDB Atlas
Authentication	JWT (JSON Web Token)
Deployment	Vercel (Frontend), Render/Railway (Backend)


⚙️ Core Features (MVP)

👩‍🍼 For Mothers
Register and create a health profile
Read weekly pregnancy or postnatal care tips
Ask questions anonymously to verified midwives
View answers or recommendations



🩺 For Health Workers / Midwives
Register and verify profile
Post educational articles or tips
Respond to user-submitted questions


🌐 General Access
Browse verified maternal health articles
View emergency contact and clinic directories

🧩 Bonus Features (Optional Enhancements)
Chatbot for basic maternal health FAQs
Forum or community discussions
Appointment booking with clinics
Multilingual content support
Email notifications for new tips or reminders


🧠 System Architecture

Frontend: React communicates with backend APIs using Axios or Fetch.
Backend: Express.js RESTful APIs handle user authentication, article management, and Q&A logic.
Database: MongoDB stores user profiles, articles, and health questions.

Frontend (React) <--> Backend API (Express + Node) <--> MongoDB (Atlas)

🗂️ Folder Structure
SafeMother/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # App pages (Home, Dashboard, etc.)
│   │   ├── context/       # Global state/context
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── server/                # Node/Express backend
│   ├── controllers/       # Logic for routes
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth & validation
│   ├── server.js          # Main entry file
│   └── package.json
│
└── README.md

🗃️ Sample Database Schema
User
{
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['mother', 'midwife', 'admin'], default: 'mother' },
  location: String,
  stage: String, // e.g., "First Trimester"
  createdAt: Date
}

Article
{
  title: String,
  content: String,
  category: String, // e.g., "Nutrition", "Baby Care"
  author: ObjectId,
  createdAt: Date
}

Question
{
  userId: ObjectId,
  question: String,
  answer: String,
  answeredBy: ObjectId,
  createdAt: Date
}

🖥️ Pages Overview
Page	Description
Home	Introduction, featured articles, signup/login buttons
Login / Register	Authentication for users
Dashboard	Personalized health tips and Q&A section
Articles	List and search verified maternal health articles
Ask a Midwife	Submit and view questions and answers
Admin Panel	Manage users, articles, and content (optional)
🧭 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/yourusername/safemother.git
cd safemother

2️⃣ Install Dependencies
cd client
npm install
cd ../server
npm install

3️⃣ Create a .env File in /server

Add your environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

4️⃣ Run the Application
# Run backend
cd server
npm start

# Run frontend
cd ../client
npm start

5️⃣ Open in Browser

Visit: http://localhost:3000

🚀 Deployment

Frontend: Deploy using Vercel
 or Netlify

Backend: Use Render
, Cyclic
, or Railway

Database: Use MongoDB Atlas

💪 Expected Impact

Empower women with reliable maternal health education.

Strengthen community access to midwives and verified professionals.

Promote safe pregnancy and delivery practices.

Encourage early antenatal care and postnatal awareness.

📊 SDG Impact Alignment
SDG Goal	Contribution
SDG 3: Good Health and Well-Being	Provides access to maternal health information and support
SDG 5: Gender Equality	Promotes women’s health and empowerment
SDG 9: Industry, Innovation and Infrastructure	Demonstrates innovative use of digital health solutions

👩‍💻 Author
Name: CHIEMEKE IZO
Institution: PLP Academy
Specialization: Full Stack Web Development
Project Title: SafeMother — Maternal Health Support Platform
Date: October 22, 2025

💬 License

This project is created for educational and commercial purposes under the MIT License.