// routes/UserDetails.js
const express = require("express");
const router = express.Router();
const UserDetails = require("../models/UserDetails");

// ✅ Create or Update user details (Upsert)
router.post("/save/:userId", async (req, res) => {
  const { userId } = req.params;
  const formData = req.body; // frontend sends the full array

  if (!Array.isArray(formData)) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  try {
    const userDetails = await UserDetails.findOneAndUpdate(
      { userId },
      { formData, updatedAt: Date.now() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({
      message: "User details saved successfully",
      data: userDetails,
    });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user details by userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userDetails = await UserDetails.findOne({ userId });
    if (!userDetails)
      return res.status(404).json({ message: "User details not found" });

    res.json(userDetails);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete user details (optional)
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await UserDetails.findOneAndDelete({ userId });
    res.json({ message: "User details deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
