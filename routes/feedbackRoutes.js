const express = require('express');
const router = express.Router();
const {FeedbackController,getFeedbacks} = require('../controllers/feedbackController');


router.post('/', FeedbackController);

router.get('/', getFeedbacks);

module.exports = router;
