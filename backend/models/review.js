const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  product: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
  comment: { type: String, required: true },
  star: { type: Number, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);