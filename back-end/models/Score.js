const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  score: {
    type: Number,
    rquired: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SCORE = mongoose.model('score', scoreSchema);

module.exports = SCORE;
