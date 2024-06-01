const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  playRights: { type: Number, default: 3 },
  score: { type: Number, default: 0 },
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
