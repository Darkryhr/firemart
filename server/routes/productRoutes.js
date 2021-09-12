const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.route('/').get(productController.getAllProducts);
router.route('/categories').get(productController.getCategories);
router.route('/:id').get(productController.getProduct);

module.exports = router;
