// app.js
const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const customerRouter = require('./routes/customerRoutes'); // Import customer routes
const communicationsRouter = require('./routes/communicationsRoutes');
const feedbackRouter = require('./routes/feedbackRoutes'); 
const queryRouter = require('./routes/queryRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const consumerRoutes = require('./routes/consumerRoutes');

// middleware to allow cross-origin requests from any domain
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use((req, res, next) => {
    console.log('Middleware check:', req.originalUrl); // Log the original URL requested
    next(); // Call next middleware in chain
  });

// middleware to parse the cookies
app.use(cookieParser());

// middleware to parse the request body
app.use(express.json());

// middleware to log the request
app.use(morgan('dev'));

// defining the endpoints or routes
app.use('/users', userRouter);
app.use('/customers', customerRouter); 
app.use('/communications', communicationsRouter);

app.use('/feedback', feedbackRouter); 
app.use('/query', queryRouter); 
app.use('/api/consumers', consumerRoutes);

// export the app module
module.exports = app;
