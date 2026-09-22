const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./src/middleware/errorHandler');

const authRoutes = require('./src/routes/auth');
const memberRoutes = require('./src/routes/members');
const dashboardRoutes = require('./src/routes/dashboard');
const groceryRoutes = require('./src/routes/groceries');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/groceries', groceryRoutes);
app.use('/api/announcements', require('./src/routes/announcements'));
app.use('/api/menu', require('./src/routes/menu'));
app.use('/api/user-auth', require('./src/routes/userAuth'));

app.use(errorHandler);

module.exports = app;