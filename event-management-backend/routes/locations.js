const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const locations = await db("locations").select("id", "name");
        res.status(200).json(locations);
    } catch (error) {
        console.error("Failed to fetch locations:", error);
        res.status(500).json({ message: "Failed to fetch locations", error });
    }
});
  
module.exports = router;
