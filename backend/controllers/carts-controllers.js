const User = require('../models/user');
const Product = require('../models/product');

const putInCart = async (req, res, next) => {
  const userId = req.params.uid;
  const productId = req.params.pid;
  
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
  
  if(user.cart.includes(product.id)) {
    const error = new Error('already put in cart');
    error.code = 422;
    return next(error);
  }

  try {
    user.cart.push(product);
    await user.save();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(200).json('Put in Cart');
};

const deleteFromCart = async (req, res, next) => {
  const userId = req.params.uid;
  const productId = req.params.pid;
  
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
  
  try {
    user.cart.pull(product);
    await user.save();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(200).json('Delete from Cart');
};

const deleteAllFromCart = async (req, res, next) => {
  const userId = req.params.uid;
  
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
  
  try {
    user.cart = [];
    await user.save();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(200).json('Delete All from Cart');
};

exports.putInCart = putInCart;
exports.deleteFromCart = deleteFromCart;
exports.deleteAllFromCart = deleteAllFromCart;