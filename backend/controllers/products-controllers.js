const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Product = require('../models/product');

const getHomeProduct = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({});
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }
  res.status(200).json({products: products.map(product => product.toObject({ getters: true }))});
};

const getProduct = async (req, res, next) => {
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

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const getCategory = async (req, res, next) => {
  const categoryId = req.params.cid;

  let products;
  try {
    products = await Product.find({category: categoryId});
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  if (!products || products.length === 0) {
    const error = new Error('can not find product');
    error.code = 404;
    return next(error);
  }

  res.status(200).json({
    products: products.map(product =>
      product.toObject({ getters: true })
    )
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid inputs");
    error.code = 422;
    return next(error);
  }

  const { name, description, category, price, stock } = req.body;

  
  const createdProduct = new Product({
    name,
    description,
    category,
    price,
    stock,
    image: process.env.BACKEND_URL + req.file.path,
    review: []
  });

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

const editProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid inputs");
    error.code = 422;
    return next(error);
  }

  const { name, description, category, price, stock } = req.body;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  product.name = name;
  product.description = description;
  product.category = category;
  product.price = price;
  product.stock = stock;

  try {
    await product.save();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
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
  
  const imagePath = product.image.replace(process.env.BACKEND_URL, '');
  
  try {
    await product.deleteOne();
  } catch (err) {
    const error = new Error('something went wrong');
    error.code = 500;
    return next(error);
  }
  
  fs.unlink(imagePath, err => {
    console.log(err);  
  });
  
  res.status(200).json({ message: 'Delete product.' });
};

exports.getHomeProduct = getHomeProduct;
exports.getProduct = getProduct;
exports.getCategory = getCategory;
exports.createProduct = createProduct;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
