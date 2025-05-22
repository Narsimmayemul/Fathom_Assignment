const express = require("express");
const auth = require("../middleware/auth");
const Ships = require("../models/ShipsModel");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const query = req.query.name;
  console.log("Search query:", query);
  try {
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchConditions = [
      { name: { $regex: query, $options: "i" } },
      { IMO: { $regex: query, $options: "i" } },
      { flag: { $regex: query, $options: "i" } },
      { type: { $regex: query, $options: "i" } }
    ];
    if (!isNaN(query)) {
      searchConditions.push({ built: Number(query) });
    }

    const filteredShip = await Ships.findOne({
      $or: searchConditions
    });

    if (!filteredShip) {
      return res.status(404).json({ message: "Ship not found" });
    }

    res.json(filteredShip);
  } catch (error) {
    console.error("Error in /ships route:", error);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/All", auth, async (req, res) => {
  try{
    const filteredShip = await Ships.find();
    res.json(filteredShip);
  } catch (error) {
    console.error("Error in /ships route:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/post", auth, async (req, res) => {
  console.log(req.body);
  try {
    const newShip = req.body;
    await Ships.create(newShip);
    res.status(201).json(newShip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
