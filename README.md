# 🛒 E-Commerce API

**E-Commerce API** is a Backend project built with **Node.js** and **Express.js**, designed to provide scalable and modular APIs for e-commerce applications.  

It currently supports:  
- 📂 **Categories & SubCategories** (Full CRUD)  
- 🏷️ **Brands** (Full CRUD)  
- 🛍️ **Products** (CRUD – *search & filters coming soon*)  
- 🛒 **Cart** (Create functionality implemented)  
- 🧾 **Order** (Create functionality implemented)  
- 🔐 **Authentication & Users** *(planned)*  

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (Access/Refresh tokens), Email Confirmation *(planned)*  
- **File Upload:** Multer + Cloudinary  
- **Validation:** Joi  
- **Logging & Utils:** Morgan, AsyncHandler, Slugify  
- **DB Helpers:** DataMethod (find, findOne, update, delete)  
- **Env Management:** dotenv  

---

## ✨ Features (Current Progress)

### 📂 Categories
- Create, Update, Delete (soft delete), Get All, Get By ID  
- Slugify names  
- Upload images to Cloudinary  

### 🗂️ SubCategories
- Create, Update, Delete (soft delete), Get All, Get By Category ID  
- Virtual populate relation with Category  

### 🏷️ Brands
- Create, Update, Delete (soft delete), Get All, Get By ID  
- Slugify names  
- Upload images to Cloudinary  

### 🛍️ Products
- Create, Update, Delete, Get All, Get By ID  
- Linked with Category, SubCategory, and Brand  
- Supports images upload  
- *Search & advanced filters (coming soon)*  

### 🛒 Cart
- **Create cart** functionality implemented  
- Add products to cart, update quantity if product exists  

### 🧾 Order
- **Create order** functionality implemented  
- Validate product stock, calculate total price  
- Apply coupon discount if available  

---

## ⚙️ Utilities & Middlewares
- **Morgan** → Request logging  
- **AsyncHandler** → Cleaner async error handling  
- **DataMethod** → Centralized DB queries  
- **Slugify** → Auto-generate slugs from names  
- **Validation** → Using Joi schemas  
- **dotenv** → Environment variables  

---

## 📌 Installation & Setup

```bash
# 1️⃣ Clone repo
git clone https://github.com/MohamedNser/E-commerce.git

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment
cp .env.example .env

# 4️⃣ Start development server
npm run dev
