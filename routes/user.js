//routes
const express = require("express");
const userRoutes = express.Router();
const { User } = require("../models/index");

//Get all user
userRoutes.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching restaurants" });
  }
});

// Route to get one user by ID
userRoutes.get("/:id", async (req, res) => {
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
userRoutes.get("/:id/shows", async (req, res) => {
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
userRoutes.put("/:userId/shows/:showId", async (req, res) => {
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

module.exports = userRoutes;
