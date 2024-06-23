const port = process.env.PORT;
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const reviewsRoutes = require('./routes/reviews-routes');
const cartsRoutes = require('./routes/carts-routes');

const app = express();

app.use(express.json());

app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/carts', cartsRoutes);

app.use((req, res, next) => {
  const error = new Error('Could not find this route.');
  error.code = 404;
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unkown error occured!' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rrr4ddv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });