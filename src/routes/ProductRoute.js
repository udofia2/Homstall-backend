const express = require('express');

const router = express.Router();
const { multerUploads } = require('../middlewares/multer');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { protect, authorize } = require('../middlewares/verifyAuth');

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('farmer', 'admin'), multerUploads, createProduct);

router
  .route('/:slug')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);
module.exports = router;
