const express = require("express");
const showRoutes = express.Router();
const { Show } = require("../models/index");

// Route to get all shows
showRoutes.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = showRoutes;
