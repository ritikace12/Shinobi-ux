const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Ramen', 'Appetizer', 'Drink', 'Dessert']
  },
  ingredients: [{
    type: String,
    required: true
  }],
  isSpicy: {
    type: Boolean,
    default: false
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema); 