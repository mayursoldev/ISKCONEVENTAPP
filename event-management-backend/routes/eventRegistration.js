const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get events a user has registered for
router.get("/:userId/registered-events", async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if user exists
        const user = await db("users").where({ id: userId }).first();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch registered events
        const registeredEvents = await db("event_registrations")
            .join("events", "event_registrations.event_id", "events.id")
            .select("events.id", "events.title", "events.date", "events.category", "events.location_id")
            .where("event_registrations.user_id", userId);

        res.status(200).json(registeredEvents);
    } catch (error) {
        console.error("Failed to fetch registered events:", error);
        res.status(500).json({ message: "Failed to fetch registered events", error });
    }
});



// Get all event registrations
router.get("/registrations", async (req, res) => {
  try {
    const registrations = await db("event_registrations")
      .join("events", "event_registrations.event_id", "events.id")
      .join("users", "event_registrations.user_id", "users.id")
      .select(
        "users.name as userName",
        "events.title as eventTitle",
        "events.description as eventDescription",
        "events.location_id as location",
        "event_registrations.registration_date as registeredOn"
      );

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    res.status(500).json({ message: "Failed to fetch registrations", error });
  }
});

module.exports = router;


module.exports = router;