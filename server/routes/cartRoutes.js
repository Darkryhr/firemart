const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

router.route('/').get(authController.protect, cartController.getCart);
router.route('/sum').get(cartController.getCartSum);
router.route('/add').post(authController.protect, cartController.addToCart);

module.exports = router;
