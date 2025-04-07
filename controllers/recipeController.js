const Recipe = require('../models/Recipe');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single recipe
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    Object.assign(recipe, req.body);
    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 