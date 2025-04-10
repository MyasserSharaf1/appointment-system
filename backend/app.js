const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const session = require('express-session');
const path = require('path');

const app = express();

// 1. Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// 3. Body Parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. Data Sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// 5. Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_fallback_secret_here', // Required
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  },
  store: process.env.NODE_ENV === 'production' ? 
    new (require('connect-mongo')(session))({
      mongoUrl: process.env.MONGO_URI,
      ttl: 24 * 60 * 60 // 1 day
    }) : null
}));

// 6. Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 7. Static Files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// 8. Routes - Mount all routes via index.js
app.use('/api', require('./routes'));

// 9. Error Handling - Must be last middleware
app.use(require('./middleware/error'));

module.exports = app;