const mongoose = require("mongoose");

const shinobiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  village: {
    type: String,
    required: true,
    enum: ["Konohagakure", "Sunagakure", "Kirigakure", "Kumogakure", "Iwagakure"],
  },
  rank: {
    type: String,
    required: true,
    enum: ["Genin", "Chunnin", "Jounin", "ANBU"],
  },
  speciality: {
    type: String,
    required: true,
    enum: ["Taijutsu", "Ninjutsu", "Genjutsu", "Medical", "Sealing"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Shinobi", shinobiSchema); 