const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Get a single recipe
router.get('/:id', recipeController.getRecipe);

// Create a new recipe
router.post('/', recipeController.createRecipe);

// Update a recipe
router.put('/:id', recipeController.updateRecipe);

// Delete a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router; 