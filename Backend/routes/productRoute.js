const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAdminProducts,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      return;
    }
    callback(undefined, true);
  },
});

router.route('/products').get(getAllProducts);

router.route('/admin/products').get(getAdminProducts);

router
  .route('/admin/product/new')
  .post(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    upload.array('images'),
    createProduct
  );

router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);

router.route('/product/:id').get(getProductDetails);

module.exports = router;
