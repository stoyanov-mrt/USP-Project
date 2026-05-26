const express = require("express");
const prisma = require("../../prisma/prismaClient");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const settings = await prisma.dashboardSettings.findFirst();
    return res.status(200).json(
      settings || { title: "Warehouse Inventory System", subtitle: "Electronics Distribution Center" }
    );
  } catch (error) {
    return res.status(500).json({ message: `Failed to load dashboard settings: ${error.message || error}` });
  }
});

module.exports = router;

