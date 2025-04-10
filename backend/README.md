
# Backend – Appointment Booking API

This is the **backend** for the Appointment Booking System, built with **Node.js**, **Express**, and **MongoDB**.

---

##  Setup Instructions

1. Create a \`.env\` file using the provided template:

PORT=5000
MONGO_URI=mongodb://localhost:27017/appointments
JWT_SECRET=your_jwt_secret

2. Install dependencies and run:

npm install
npm run dev


---

##  Folder Structure

backend/
├── config/ # Configuration files
├── controllers/ # Route controllers
├── middleware/ # Authentication and error handlers
├── models/ # Mongoose schemas
├── routes/ # API endpoints
├── utils/ # Helper functions
├── app.js # Express app configuration
└── server.js # Server entry point


backend/
├── config/            # DB and env setup
│   ├── db.js
│   └── .env
├── controllers/       # Logic for routes
│   ├── authController.js
│   ├── appointmentController.js
│   ├── adminController.js
│   └── doctorController.js
├── middleware/        # JWT auth, role check, errors
│   ├── auth.js
│   ├── error.js
│   └── role.js
├── models/            # Mongoose schemas
│   ├── User.js
│   ├── Appointment.js
│   └── Doctor.js
├── routes/            # API endpoints
│   ├── authRoutes.js
│   ├── appointmentRoutes.js
│   ├── adminRoutes.js
│   ├── doctorRoutes.js
│   └── index.js
├── utils/             # Helper functions
│   ├── captcha.js
│   └── timeSlots.js
├── app.js             # Express setup
├── server.js          # Entry point
└── package.json

---

##  Sample API Endpoints

## API Endpoints

| Endpoint              | Method | Description                | Access       |
|-----------------------|--------|----------------------------|--------------|
| /api/auth/register    | POST   | Register new user          | Public       |
| /api/auth/login       | POST   | Login user                 | Public       |
| /api/appointments     | GET    | Get appointments           | Authenticated|
| /api/admin/users      | GET    | Get all users              | Admin only   |

---

##  Notes

- Uses JWT for authentication
- Includes middleware for role-based access
- Modular controller and route structure
EOF


## Environment Variables

Create `.env` file with:


## Installation

npm install
node server.js