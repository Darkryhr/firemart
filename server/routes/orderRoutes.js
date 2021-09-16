const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.route('/').post();
router.route('/').get(authController.protect, orderController.getOrder);
router
  .route('/finish')
  .get(authController.protect, orderController.completeOrder);

module.exports = router;
