const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await db("events").select("*");
    res.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res.status(500).json({ message: "Failed to fetch events", error });
  }
});

// Register for an event
router.post("/:id/register", async (req, res) => {
  try {
    const { userId } = req.body;
    const eventId = req.params.id;

    // Check if event exists
    const event = await db("events").where({ id: eventId }).first();
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Register the user for the event
    await db("event_registrations").insert({ user_id: userId, event_id: eventId });

    res.json({ message: "Successfully registered for the event" });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
});

module.exports = router;
