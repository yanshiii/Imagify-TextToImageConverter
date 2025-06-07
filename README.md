# Imagify - Full Stack Text-to-Image Generator App

✨Imagify is a full-featured AI-powered web application that lets users generate images from text using a modern tech stack. It includes user authentication, credit-based generation, responsive UI, and integrated payment processing with Razorpay.


## Features

-  Text-to-Image generation using ClipDrop API
-  JWT-based authentication (Login / Signup)
-  Credit system to manage image generation quotas
-  Payment integration with Razorpay for purchasing credits
-  Image generation, preview, and download functionality
-  Responsive design with animated UI components
-  State management using React Context API
-  Backend APIs built with Node.js + Express
-  MongoDB Atlas for data storage


##  Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- React Router
- Framer Motion
- Axios
- Toastify

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- JWT for authentication
- Razorpay SDK


##  Folder Structure

imagify/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.js
├── server/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── .env
│ └── server.js


## Key Functionalities
-  Image Generation: Users can input a text prompt and receive AI-generated images.
-  User Auth: JWT-secured authentication flows with registration and login.
-  Credits System: Generation is limited by user credits; users can purchase more.
-  Razorpay Integration: Smooth checkout and verification for adding credits.
-  Gallery: Generated images are displayed with the ability to download.
-  Responsive UI: Fully responsive design and scroll animations with Framer Motion.


## Database Models

**User**
name, email, password, credits

**Transaction**
userId, credits, amount, status, plan, date