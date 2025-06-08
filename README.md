
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

## Demo

``` https://imagify-client-6gv7.onrender.com/ ```

---

## Screenshots

### 🔹 Home Page
![4A3183A7-C81A-4896-BE89-77A74FC3740D](https://github.com/user-attachments/assets/f066c9b2-8d51-4cb6-8486-ca0a84f115b0)


### 🔹 Generated to prompt: A row of happy pastel plants in tiny pots with blushing cheeks.
![AB5B0F76-7A63-42D6-A79A-08F34AB9974F](https://github.com/user-attachments/assets/51df5f42-26fb-4363-b614-69be0a6421f4)

### 🔹 Buying Credits
<img width="1470" alt="6021C781-7432-49B0-85DC-23BD5FEB1C12" src="https://github.com/user-attachments/assets/d3d80d93-dd2a-4281-955b-b2de24e71b75" />

### 🔹 Signing Up
![24F86246-9CCD-4DDD-915F-78591789E63C](https://github.com/user-attachments/assets/3136f943-dbab-477e-9e36-5c29f215df11)




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


##  Author

**Yanshi Sharma**

---

##  License

This project is licensed under the MIT License

```MIT License

Copyright (c) 2025 YANSHI SHARMA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.
```

---
