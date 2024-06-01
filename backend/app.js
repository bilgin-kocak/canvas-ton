const express = require('express');
const mongoose = require('mongoose');
const Player = require('./models/Player');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes will be here

// Get player data
app.get('/player/:walletAddress', async (req, res) => {
  console.log(req.params);
  try {
    const player = await Player.findOne({
      walletAddress: req.params.walletAddress,
    });
    if (!player) return res.status(200).send(null);
    res.send(player);
  } catch (error) {
    console.log(error);
    res.send(null);
  }
});

// Create a new player
app.post('/player', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    console.log(walletAddress);
    if (!walletAddress)
      return res.status(400).send('walletAddress is required');

    const existingPlayer = await Player.findOne({ walletAddress });
    if (existingPlayer) return res.status(400).send('Player already exists');

    const newPlayer = new Player({ walletAddress });
    await newPlayer.save();
    res.status(201).send(newPlayer);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Update play rights
app.post('/player/:walletAddress/playrights', async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate(
      { walletAddress: req.params.walletAddress },
      { $set: { playRights: req.body.playRights } },
      { new: true, upsert: true }
    );
    res.send(player);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update score
app.post('/player/:walletAddress/score', async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate(
      { walletAddress: req.params.walletAddress },
      { $set: { score: req.body.score } },
      { new: true, upsert: true }
    );
    res.send(player);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
