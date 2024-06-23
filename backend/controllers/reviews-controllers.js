const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Review = require('../models/review');
const User = require('../models/user');
const Product = require('../models/product');

const getProductReviews = async (req, res, next) => {
  const productId = req.params.pid;

  let reviews;
  try {
    reviews = await Review.find({product: productId}).populate('user');
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(200).json({reviews: reviews.map(review => review.toObject({ getters: true }))});
};

const getUserReviews = async (req, res, next) => {
  const userId = req.params.uid;

  let reviews;
  try {
    reviews = await Review.find({user: userId}).populate('product');
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(200).json({reviews: reviews.map(review => review.toObject({ getters: true }))});
};

const createReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid inputs");
    error.code = 422;
    return next(error);
  }

  const { star, comment, productId, userId } = req.body;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }
  
  if (!product) {
    const error = new Error('can not find product');
    error.code = 404;
    return next(error);
  }
  
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }
  
  if (!user) {
    const error = new Error('can not find user');
    error.code = 404;
    return next(error);
  }
  
  const createdReview = new Review({
    user,
    star,
    comment,
    product
  });
  
  try {
    await createdReview.save();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(201).json({ review: createdReview });
};

const deleteReview = async (req, res, next) => {
  const reviewId = req.params.rid;
  
  let review;
  try {
    review = await Review.findById(reviewId);
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  if (!review) {
    const error = new Error('can not find review');
    error.code = 404;
    return next(error);
  }
    
  try {
    await review.deleteOne();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  
  res.status(200).json({text: "Delete Review"});
};

exports.getProductReviews = getProductReviews;
exports.getUserReviews = getUserReviews;
exports.createReview = createReview;
exports.deleteReview = deleteReview;
