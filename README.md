# E-commerce Website

## Description
This is a full-stack mini e-commerce web application where users can browse products, add items to the cart, and simulate checkout. The application includes separate frontend, backend, and admin sections, all deployed and live.

---

## Features
- Browse products with detailed information.
- Add/remove products from the shopping cart.
- Manage orders and simulate checkout.
- User authentication for secure actions.
- Admin panel to manage products and orders.
- Full-stack integration with React frontend and Node.js/Express backend.
- Responsive design using Tailwind CSS.

---

## Responsibilities / Key Contributions
- Designed and implemented the **frontend UI** for product listings, cart, and order pages.
- Built the **backend** with Express.js and MongoDB to handle products, users, orders, and authentication.
- Implemented **CRUD operations** for products and users, as well as **cart session management**.
- Connected **frontend and backend** for full-stack functionality.
- Ensured proper **deployment on Vercel** for frontend, backend, and admin interfaces.
- Added error handling for API requests, including authentication and server errors.

---

## Tools & Technologies
- **Frontend:** React, Tailwind CSS, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Vercel

---

## Project Structure

e-commerce-project/
│
├── backend/                 # Node.js + Express backend
│   ├── controllers/         # Route logic
│   ├── models/              # Mongoose models (User, Product, Order)
│   ├── routes/              # Express route files
│   ├── middleware/          # Auth or error-handling middleware
│   ├── utils/               # Utility functions (e.g., Cloudinary, Stripe)
│   ├── server.js            # Entry point of backend
│   ├── package.json
│   └── .env.example         # Environment variable template
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components (e.g., Navbar, Footer, ProductCard)
│   │   ├── pages/           # Pages (Home, Collection, Product, Cart, Contact, Orders)
│   │   ├── context/         # React context (e.g., ShopContext)
│   │   ├── hooks/           # Custom hooks
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── assets/          # Images, icons, styles
│   ├── package.json
│   └── tailwind.config.js
│
├── admin/                   # Admin panel frontend
│   ├── src/
│   │   ├── components/      # Admin components (Dashboard, ProductForm, OrderList)
│   │   ├── pages/           # Admin pages
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── assets/          # Images, icons, styles
│   ├── package.json
│   └── tailwind.config.js
│
├── README.md                # Project documentation
└── .gitignore               # Git ignore file


---
## Notes:

##### 1-Backend:
- Keep models, routes, controllers, and middleware separate for clarity.
- server.js is the entry point.
  
##### 2-Frontend/Admin:
- Separate components and pages.
- Keep assets (images, CSS) organized.

##### 3-Environment variables:
- Each part (backend, frontend/admin if needed) should have .env or .env.example.

##### 4-This structure makes it easier to deploy frontend, backend, and admin independently (like you did on Vercel).
---

#### Installation & Setup

1. **Clone the repository:**
```bash
git clone <repository_url>
````
Backend Setup:

`````bash
Copy code
cd backend
npm install
cp .env.example .env   # Add your environment variables (MONGO_URL, JWT_SECRET, etc.)
npm run server         # For development with nodemon
npm start
``````
## Frontend Setup:

``bash
Copy code
cd frontend
npm install
npm start
``           
## Admin Panel Setup:
```
bash
Copy code
cd admin
npm install
npm start
````
## Environment Variables:
- MONGO_URL → MongoDB connection string
- JWT_SECRET → Secret key for JWT authentication
- Any other API keys for Stripe, Cloudinary, etc.

## API Endpoints (Backend)
- POST /api/order/place → Place an order (requires authentication)
- GET /api/products → Fetch all products
- POST /api/auth/login → User login
- POST /api/auth/register → User registration
- CRUD /api/products → Manage products (Admin only)
- CRUD /api/users → Manage users (Admin only)
---
## Notes
- Make sure environment variables are properly set for deployment on Vercel.
- MongoDB Atlas should allow connections from Vercel (0.0.0.0/0 for testing or proper IP whitelist).
- Frontend must use the deployed backend URL instead of localhost when live.
---
## Live Demo
Frontend: https://e-commerce-frontend-ecru-five.vercel.app/

Admin Panel: https://e-commerce-admin-ten-khaki.vercel.app/

