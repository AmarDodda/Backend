const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/FeedbackController');


router.post('/', feedbackController.FeedbackController);

router.get('/', feedbackController.getFeedbacks);

module.exports = router;
