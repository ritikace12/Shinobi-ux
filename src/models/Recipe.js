const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    enum: ['Ramen', 'Sushi', 'Appetizers', 'Drinks']
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema); 