//routes
const express = require("express");
const router = express.Router();
const { User } = require("../models/index");

//Get all user
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching restaurants" });
  }
});

module.export = router;
