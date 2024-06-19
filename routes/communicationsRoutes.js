const express = require('express');
const router = express.Router();
const communicationsController = require('../controllers/communicationsController');

// Route to send combined feedback and query email
router.post('/sendEmail/:customerId', communicationsController.sendCombinedEmail);

router.get('/', communicationsController.getCommunications);

module.exports = router;
