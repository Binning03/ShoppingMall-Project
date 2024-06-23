const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/user');

const getUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  
  try {
    user = await User.findById(userId).populate('cart history');
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

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid inputs');
    error.code = 422;
    return next(error);
  }
  const { name, email, password, repeatpassword, address, phonenumber } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }
  
  if (existingUser) {
    const error = new Error('already existing email');
    error.code = 401;
    return next(error);
  }
  
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch(err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }
  
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    address,
    phonenumber,
    admin: false,
    cart: [],
    review: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  if (!existingUser) {
    const error = new Error('can not find user');
    error.code = 404;
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch(err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }
  
  if(!isValidPassword) {
    const error = new Error('Invalid password');
    error.code = 401;
    return next(error);
  }
  
  res.status(200).json({user: existingUser.toObject({ getters: true })});
};

const editUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid inputs');
    error.code = 422;
    return next(error);
  }
  const { name, address, phonenumber } = req.body;

  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  user.name = name;
  user.address = address;
  user.phonenumber = phonenumber;

  try {
    await user.save();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const payment = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  
  try {
    user = await User.findById(userId).populate('cart');
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
    const sess = await mongoose.startSession();
    sess.startTransaction();
    user.cart.map(async(product) => { 
      product.stock = product.stock-1;
      user.history.push(product);
      await product.save();
    });
    user.cart = [];
    await user.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }
  
  res.status(200).json({ user: user.toObject({ getters: true })});
};

exports.getUser = getUser;
exports.login = login;
exports.signup = signup;
exports.editUser = editUser;
exports.payment = payment;