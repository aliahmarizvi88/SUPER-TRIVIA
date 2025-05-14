const SCORE = require('../models/Score');

const submitScore = async (req, res) => {
  try {
    const { playerName, category, difficulty, score } = req.body;

    if (!playerName || isNaN(Number(score))) {
      return res
        .status(400)
        .json({ error: 'Player name and scores are Required' });
    }

    await SCORE.create({
      playerName,
      category,
      difficulty,
      score,
    });

    return res.status(200).json({ error: 'Score Submitted Successfully' });
  } catch (error) {
    console.error('Submit Score Error:', error.message);
    return res
      .status(500)
      .json({ error: 'Server error. Could not submit score.' });
  }
};

const displayScores = async (req, res) => {
  try {
    const allScore = await SCORE.find({});
    return res.json(allScore);
  } catch (error) {
    return res.status(500).json({ error: 'FAILED TO FETCH DATA' });
  }
};

module.exports = {
  submitScore,
  displayScores,
};
