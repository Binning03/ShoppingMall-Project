const express = require('express');
const multer = require('multer');
const { check } = require('express-validator');

const productsControllers = require('../controllers/products-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', productsControllers.getHomeProduct);

router.get('/:pid', productsControllers.getProduct);

router.get('/category/:cid', productsControllers.getCategory);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    //check('image').not().isEmpty(),
    check('category').not().isEmpty(),
    check('price').not().isEmpty(),
    check('stock').not().isEmpty()
  ],
  productsControllers.createProduct
);

router.patch(
  '/:pid',
  [
    check('name').not().isEmpty(), 
    check('description').not().isEmpty(),
    check('category').not().isEmpty(),
    check('price').not().isEmpty(),
    check('stock').not().isEmpty()
  ],
  productsControllers.editProduct
);

router.delete('/:pid', productsControllers.deleteProduct);

module.exports = router;