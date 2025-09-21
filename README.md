# 🛒 E-Commerce API

A comprehensive, production-ready **E-Commerce Backend API** built with Node.js and Express.js. This scalable solution provides robust functionality for modern online stores with secure authentication, advanced product management, and complete order processing.

## 🚀 Live Demo

**API Base URL:** [https://e-commerce-s7t6.vercel.app](https://e-commerce-s7t6.vercel.app)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Complete Authentication System
- JWT access/refresh token implementation
- User registration with email verification
- Secure password reset functionality
- Role-based access control (Admin/User)
- Account management and profile updates

### 📦 Advanced Product Management
- Full CRUD operations for products
- Multi-category and subcategory support
- Brand management system
- Multiple image upload with Cloudinary
- Advanced search and filtering
- Real-time inventory tracking
- Stock alerts and management

### 🛒 Shopping Cart & Orders
- Persistent shopping cart functionality
- Smart quantity updates and validation
- Complete order processing system
- Stripe payment integration
- Order confirmation emails
- Order history and tracking
- Coupon system with discount logic

### 📧 Email Integration
- Email verification for new accounts
- Password reset emails
- Order confirmation notifications
- Template-based email system using Nodemailer

### 🛡️ Security & Validation
- Comprehensive input validation using Joi
- Password hashing with bcrypt
- JWT token security
- Request rate limiting
- Data sanitization
- Error logging and monitoring

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary
- **Email Service:** Nodemailer
- **Validation:** Joi
- **Password Hashing:** bcrypt
- **Environment Management:** dotenv
- **HTTP Logging:** Morgan
- **Deployment:** Vercel

## 🚀 Installation

### Prerequisites
- Node.js (v20.x or higher)
- MongoDB database
- Cloudinary account
- SMTP email service

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/MohamedNser/E-commerce.git
cd E-commerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see below)

5. **Start development server**
```bash
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Secrets
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Stripe (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key

# Server
PORT=3000
NODE_ENV=development
```

## 🔗 API Endpoints

### Authentication Routes
```
POST   /api/v1/auth/register        - User registration
POST   /api/v1/auth/signin          - User login
POST   /api/v1/auth/refresh         - Refresh access token
POST   /api/v1/auth/forget-password - Password reset request
POST   /api/v1/auth/reset-password  - Reset password
GET    /api/v1/auth/verify-email    - Email verification
```

### User Routes
```
GET    /api/v1/users/profile        - Get user profile
PUT    /api/v1/users/profile        - Update user profile
PUT    /api/v1/users/change-password - Change password
```

### Category Routes
```
GET    /api/v1/categories           - Get all categories
GET    /api/v1/categories/:id       - Get category by ID
POST   /api/v1/categories           - Create category (Admin)
PUT    /api/v1/categories/:id       - Update category (Admin)
DELETE /api/v1/categories/:id       - Delete category (Admin)
```

### SubCategory Routes
```
GET    /api/v1/subcategories        - Get all subcategories
GET    /api/v1/subcategories/:id    - Get subcategory by ID
POST   /api/v1/subcategories        - Create subcategory (Admin)
PUT    /api/v1/subcategories/:id    - Update subcategory (Admin)
DELETE /api/v1/subcategories/:id    - Delete subcategory (Admin)
```

### Brand Routes
```
GET    /api/v1/brands               - Get all brands
GET    /api/v1/brands/:id           - Get brand by ID
POST   /api/v1/brands               - Create brand (Admin)
PUT    /api/v1/brands/:id           - Update brand (Admin)
DELETE /api/v1/brands/:id           - Delete brand (Admin)
```

### Product Routes
```
GET    /api/v1/products             - Get all products (with search & filters)
GET    /api/v1/products/:id         - Get product by ID
POST   /api/v1/products             - Create product (Admin)
PUT    /api/v1/products/:id         - Update product (Admin)
DELETE /api/v1/products/:id         - Delete product (Admin)
```

### Cart Routes
```
GET    /api/v1/cart                 - Get user cart
POST   /api/v1/cart                 - Add item to cart
PUT    /api/v1/cart/:itemId         - Update cart item
DELETE /api/v1/cart/:itemId         - Remove item from cart
DELETE /api/v1/cart                 - Clear cart
```

### Order Routes
```
GET    /api/v1/orders               - Get user orders
GET    /api/v1/orders/:id           - Get order by ID
POST   /api/v1/orders               - Create order
PUT    /api/v1/orders/:id/status    - Update order status (Admin)
```

## 📊 Database Schema

### User Model
```javascript
{
  userName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (user/admin),
  isEmailConfirmed: Boolean,
  forgetCode: String,
  profilePic: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  title: String,
  slug: String,
  description: String,
  images: [String],
  price: Number,
  appliedDiscount: Number,
  priceAfterDiscount: Number,
  stock: Number,
  soldItems: Number,
  categoryId: ObjectId,
  subCategoryId: ObjectId,
  brandId: ObjectId,
  specs: Object,
  rate: Number,
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Authentication

The API uses JWT-based authentication with the following flow:

1. **Registration:** User creates account with email verification
2. **Login:** Returns access token (15min) and refresh token (7 days)
3. **Protected Routes:** Require valid access token in Authorization header
4. **Token Refresh:** Use refresh token to get new access token
5. **Role Authorization:** Admin-only routes for management operations

### Using Authentication

```javascript
// Include in request headers
Authorization: Bearer <access_token>
```

## 📁 File Upload

Images are uploaded to Cloudinary with the following features:

- **Automatic optimization** and compression
- **Multiple format support** (JPEG, PNG, WebP)
- **Secure upload** with signed URLs
- **Image transformation** on-the-fly
- **CDN delivery** for fast loading

## ❌ Error Handling

The API implements comprehensive error handling:

- **Validation Errors:** 400 status with detailed field errors
- **Authentication Errors:** 401 status for unauthorized requests
- **Authorization Errors:** 403 status for forbidden actions
- **Not Found Errors:** 404 status for missing resources
- **Server Errors:** 500 status with error logging
- **Database Errors:** Proper MongoDB error handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"],
  "stack": "Stack trace (development only)"
}
```

## 🧪 Testing

Use the provided Postman collection for testing all endpoints:

1. Import the collection from `/docs/postman-collection.json`
2. Set up environment variables
3. Start with authentication endpoints
4. Test all CRUD operations

## 📈 Performance Features

- **Database Indexing:** Optimized queries with proper indexes
- **Pagination:** Efficient data loading with limit/skip
- **Caching:** Strategic caching for frequently accessed data
- **Image Optimization:** Compressed and resized images
- **Query Optimization:** Efficient MongoDB aggregation pipelines

## 🚀 Deployment

The API is deployed on Vercel with:

- **Serverless Functions:** Automatic scaling
- **Environment Variables:** Secure configuration
- **Global CDN:** Fast response times
- **Automatic Deployments:** CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohamed Nser**
- GitHub: [@MohamedNser](https://github.com/MohamedNser)
- LinkedIn: [Mohamed Nser](https://linkedin.com/in/mohammednser)

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB team for the powerful database
- Cloudinary for image management solutions
- All contributors and supporters

---

**⭐ If you found this project helpful, please give it a star!**
