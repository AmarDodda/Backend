const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const customerRouter = require('./routes/customerRoutes'); 
const communicationsRouter = require('./routes/communicationsRoutes');
const feedbackRouter = require('./routes/feedbackRoutes'); 
const queryRouter = require('./routes/queryRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const consumerRoutes = require('./routes/consumerRoutes');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use((req, res, next) => {
    console.log('Middleware check:', req.originalUrl); 
    next(); 
  });


app.use(cookieParser());


app.use(express.json());


app.use(morgan('dev'));


app.use('/users', userRouter);
app.use('/customers', customerRouter); 
app.use('/communications', communicationsRouter);

app.use('/feedback', feedbackRouter); 
app.use('/query', queryRouter); 
app.use('/api/consumers', consumerRoutes);


module.exports = app;
