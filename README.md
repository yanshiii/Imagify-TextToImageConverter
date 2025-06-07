
# 🌟 Imagify - Full Stack Text-to-Image Generator App

**Imagify** is a full-featured AI-powered web application that allows users to generate images from text. It includes authentication, a credit system, Razorpay integration, and a modern responsive UI.

---

##  Features

-  Text-to-Image generation using **ClipDrop API**
-  JWT-based **User Authentication (Login / Signup)**
-  **Credit system** to manage generation quota
-  Payment integration with **Razorpay**
-  Image preview, download, and gallery
-  Responsive UI with animations using **Framer Motion**
-  State management with **React Context API**
-  Full backend with **Node.js + Express**
-  Database: **MongoDB Atlas**

---

##  Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Toastify

### 🔹 Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Razorpay SDK

---

##  Folder Structure

```
imagify/
├── client/            # React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.js
│       └── index.js
│
├── server/            # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── server.js
```

---

##  Key Functionalities

- **Image Generation** — Input text and get an AI-generated image.
- **Authentication** — Secure signup/login with JWT.
- **Credits System** — Users can only generate images if they have credits.
- **Razorpay Payments** — Users can purchase more credits.
- **Gallery** — View and download previously generated images.
- **Responsive Design** — Fully optimized for all devices.

---

##  Database Models

### 🔸 User
- `name`
- `email`
- `password`
- `credits`

### 🔸 Transaction
- `userId`
- `credits`
- `amount`
- `status`
- `plan`
- `date`

---


## 🧑‍💻 Author

**Yanshi Sharma**  
[GitHub](https://github.com/yanshiii)

---

##  License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---
