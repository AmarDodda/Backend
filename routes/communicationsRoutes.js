const express = require('express');
const router = express.Router();
const communicationsController = require('../controllers/communicationsController');

router.post('/sendEmail/:customerId', communicationsController.sendCombinedEmail);

router.get('/', communicationsController.getCommunications);

module.exports = router;
