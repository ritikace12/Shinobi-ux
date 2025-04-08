const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    // Check if a recipe with the same name already exists
    const existingRecipe = await Recipe.findOne({ name: req.body.name });
    if (existingRecipe) {
      return res.status(400).json({ message: 'A recipe with this name already exists' });
    }

    const recipe = new Recipe(req.body);
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res.status(400).json({ message: 'A recipe with this name already exists' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Get a specific recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a recipe
router.patch('/:id', async (req, res) => {
  try {
    // Check if the new name conflicts with an existing recipe
    if (req.body.name) {
      const existingRecipe = await Recipe.findOne({ 
        name: req.body.name,
        _id: { $ne: req.params.id } // Exclude the current recipe
      });
      if (existingRecipe) {
        return res.status(400).json({ message: 'A recipe with this name already exists' });
      }
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    Object.assign(recipe, req.body);
    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res.status(400).json({ message: 'A recipe with this name already exists' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    await recipe.remove();
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 