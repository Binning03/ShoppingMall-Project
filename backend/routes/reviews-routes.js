const express = require('express');
const { check } = require('express-validator');

const reviewsControllers = require('../controllers/reviews-controllers');

const router = express.Router();

router.get('/product/:pid', reviewsControllers.getProductReviews);

router.get('/user/:uid', reviewsControllers.getUserReviews);

router.post(
  '/',
  [
    check('star').not().isEmpty(),
    check('comment').not().isEmpty(),
    check('userId').not().isEmpty(),
    check('productId').not().isEmpty()
  ],
  reviewsControllers.createReview
);

router.delete('/:rid', reviewsControllers.deleteReview);

module.exports = router;