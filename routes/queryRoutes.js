// routes/queryRoutes.js
const express = require('express');
const router = express.Router();
const {submitQuery, getQueries} = require('../controllers/queryController');

router.post('/', submitQuery);
router.get('/', getQueries);

module.exports = router;
