const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/FeedbackController');


router.post('/', feedbackController.submitFeedback);

router.get('/', feedbackController.getFeedbacks);

module.exports = router;
