// routes/consumerRoutes.js

const express = require('express');
const { register, login, logout, getConsumerById, getConsumer  } = require('../controllers/consumerController');
const auth = require('../middleware/auth');
const consumerAuth =require('../middleware/authConsumer')

const router = express.Router();

// Consumer registration route
router.post('/consumerregister', register);

router.get('/consumerlogin',login)

// Consumer login route
router.post('/consumerlogin', login);

// Consumer logout route
router.post('/consumerlogout', logout);

// router.get('/:id', auth.checkAuth, auth.isAdmin,getConsumerById );

router.get('/profile', consumerAuth.checkAuthConsumer, getConsumer);

// router.get('/consumerregister', (req, res) => {
//     res.send('This is the consumer registration endpoint');
//   });



module.exports = router;
