const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const productController = require('../controllers/productController');

router.route('/').get(productController.allProducts);

module.exports = router;
