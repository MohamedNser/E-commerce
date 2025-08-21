# 🛒 E-Commerce API

**E-Commerce API** is a Backend project built with **Node.js** and **Express.js**, providing core APIs for managing:  
- 👤 Users (Authentication & Authorization)  
- 📂 Categories & SubCategories  
- 🏷️ Brands  
- 🛍️ Products *(coming soon)*  

It supports **image upload**, **role-based authorization**, and a clean, scalable database structure.

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (Access & Refresh Tokens), Email Confirmation  
- **File Upload:** Multer + Cloudinary  
- **Utilities:** Morgan, Slugify, AsyncHandler, DataMethod (DB abstraction)  
- **Validation:** Joi  
- **Environment Management:** dotenv  

---

## ✨ Features

### 🔐 Authentication & Authorization
- Sign Up / Sign In / Confirm Email  
- Update Password  
- Forget Password + Send Code  
- Refresh Token  
- Role-based Authorization  

### 📂 Category Management
- Create / Update / Get All / Get By ID  
- Slugify for category names  
- Upload category images to Cloudinary  

### 🗂️ SubCategory Management
- Create / Update / Get All / Get By Category ID  
- Virtual Populate for Category ↔ SubCategory relation  

### 🏷️ Brand Management
- Create Brand  
- Update Brand  
- Get Brand  

---

## ⚙️ Utilities & Middlewares
- **Morgan** → Request logging  
- **AsyncHandler** → Clean async/await error handling  
- **DataMethod** → Centralized DB helper (find, findOne, update)  
- **dotenv** → Environment variables management  

---

## 📬 API Documentation
- All APIs tested using **Postman**  
- Postman collection is available with the project  

---

## 📌 Getting Started

### 1️⃣ Clone the repo
