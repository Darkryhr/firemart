const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.route('/').post();
router.route('/').get(authController.protect, orderController.getOrder);

module.exports = router;
