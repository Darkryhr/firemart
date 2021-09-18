const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.route('/').get(productController.getAllProducts);
router.route('/categories').get(productController.getCategories);
router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct);

router.route('/gallery').post(productController.addProductImage);
router.route('/').post(productController.createProduct);
module.exports = router;
