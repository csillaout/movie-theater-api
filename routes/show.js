const express = require("express");
const router = express.Router();
const { Show } = require("../models/index");

// Route to get all shows
router.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get one user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all shows watched by a user
router.get("/:id/shows", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const shows = await user.getShows();
      res.json(shows);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to associate a user with a show they have watched
router.put("/:userId/shows/:showId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const show = await Show.findByPk(req.params.showId);

    if (user && show) {
      await user.addShow(show);
      res.status(200).json({ message: "Show added to user's watched list" });
    } else {
      res.status(404).json({ error: "User or Show not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// You can add more show-related routes here

module.exports = router;
