import express from "express";
import Item from "../models/item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.aggregate([{ $sample: { size: 4 } }]);
    const correct = items[Math.floor(Math.random() * items.length)];
    res.json({ items, correct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
