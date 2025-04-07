const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipe);

// Protected routes (require authentication)
router.post('/', auth, recipeController.createRecipe);
router.put('/:id', auth, recipeController.updateRecipe);
router.delete('/:id', auth, recipeController.deleteRecipe);

module.exports = router; 