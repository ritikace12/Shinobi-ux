const express = require("express");
const router = express.Router();
const Shinobi = require("../models/Shinobi");

// Get all shinobi
router.get("/", async (req, res) => {
  try {
    const shinobi = await Shinobi.find().sort({ createdAt: -1 });
    res.json(shinobi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new shinobi
router.post("/", async (req, res) => {
  const shinobi = new Shinobi({
    name: req.body.name,
    village: req.body.village,
    rank: req.body.rank,
    speciality: req.body.speciality,
    description: req.body.description,
  });

  try {
    const newShinobi = await shinobi.save();
    res.status(201).json(newShinobi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get shinobi by ID
router.get("/:id", async (req, res) => {
  try {
    const shinobi = await Shinobi.findById(req.params.id);
    if (shinobi) {
      res.json(shinobi);
    } else {
      res.status(404).json({ message: "Shinobi not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update shinobi
router.patch("/:id", async (req, res) => {
  try {
    const shinobi = await Shinobi.findById(req.params.id);
    if (shinobi) {
      Object.keys(req.body).forEach((key) => {
        shinobi[key] = req.body[key];
      });
      const updatedShinobi = await shinobi.save();
      res.json(updatedShinobi);
    } else {
      res.status(404).json({ message: "Shinobi not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete shinobi
router.delete("/:id", async (req, res) => {
  try {
    const shinobi = await Shinobi.findById(req.params.id);
    if (shinobi) {
      await shinobi.remove();
      res.json({ message: "Shinobi deleted" });
    } else {
      res.status(404).json({ message: "Shinobi not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 