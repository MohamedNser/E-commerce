# 🛒 E-Commerce API

**E-Commerce API** هو مشروع Backend باستخدام Node.js وExpress.js لتوفير APIs أساسية لإدارة المستخدمين، المنتجات، الفئات (Categories)، والمصادقة (Authentication)، مع رفع الصور وإدارة البيانات بشكل احترافي.

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (Access & Refresh Tokens), Email Confirmation
- **File Upload:** Multer, Cloudinary
- **Utilities:** Morgan, Slugify, AsyncHandler, DataMethod (DB abstraction)
- **Validation:** Joi
- **Environment Management:** dotenv

---

## ✨ Features

### 🔐 Authentication & Authorization
- Sign Up / Sign In / Confirm Email
- Update Password
- Forget Password with Send Code
- Refresh Token
- Role-based Authorization

### 📂 Category Management
- Create Category
- Update Category
- Get All Categories
- Get Category By ID
- Slugify for category names
- Upload category images to Cloudinary

---

## ⚙️ Utilities & Middlewares
- **Morgan**: Logging requests
- **AsyncHandler**: Clean error handling with async/await
- **DataMethod**: ملف موحد لدوال التعامل مع الـ DB (`find`, `findOne`, `update`) لتنظيم الكود وإعادة استخدامه

---

## 📬 API Documentation
تم اختبار جميع الـ APIs باستخدام Postman، والـ collection متوفرة.

---

## 📌 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/MohamedNser/e-commerce.git
cd e-commerce

