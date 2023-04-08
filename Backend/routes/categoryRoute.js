const express = require('express');
const { newCategory } = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/create/category').post(newCategory);
module.exports = router;
