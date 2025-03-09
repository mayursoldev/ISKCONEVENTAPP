const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Fetch all events
router.get("/", async (req, res) => {
    try {
        const events = await db("events").select("*");
        res.status(200).json(events);
    } catch (error) {
        console.error("Failed to fetch events:", error);
        res.status(500).json({ message: "Failed to fetch events", error });
    }
});


// router.get("/locations", async (req, res) => {
//   try {
//       const locations = await db("locations").select("id", "name");
//       res.status(200).json(locations);
//   } catch (error) {
//       console.error("Failed to fetch locations:", error);
//       res.status(500).json({ message: "Failed to fetch locations", error });
//   }
// });


// Add or update an event
router.post("/addOrUpdate", async (req, res) => {
    try {
        const { id, title, description, date, category, location_id } = req.body;

        // Validate required fields
        console.log("inside reqbody", req.body)
        if (!title || !description || !date || !category || !location_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (id) {
            // Update event if ID exists
            const updated = await db("events").where({ id }).update({
                title,
                description,
                date,
                category,
                location_id,
                sk: `event#${id}`
            });
            
            if (updated) {
                return res.status(200).json({ message: "Event updated successfully", eventId: id, sk: `event#${id}` });
            } else {
                return res.status(404).json({ message: "Event not found for update" });
            }
        } else {
            // Create new event if ID is not provided
            req.body.created_at = new Date();
            const [eventId] = await db("events").insert(
               req.body
            );
            res.status(201).json({ message: {title} + " Event created successfully" });
            
            // if (eventId) {
            //     await db("events").where({ id: eventId }).update({ sk: `event#${eventId}` });
            //     res.status(201).json({ message: "Event created successfully", eventId, sk: `event#${eventId}` });
            // }
        }
    } catch (error) {
        console.error("Failed to add/update event:", error);
        res.status(500).json({ message: "Failed to add/update event", error });
    }
});

// Register a user for an event
router.post("/:id/register", async (req, res) => {
    try {
        const { userId } = req.body;
        const eventId = req.params.id;

        // Check if event exists
        const event = await db("events").where({ id: eventId }).first();
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Check if user is already registered
        const existingRegistration = await db("event_registrations")
            .where({ user_id: userId, event_id: eventId })
            .first();

        if (existingRegistration) {
            return res.status(400).json({ message: "User already registered for this event" });
        }

        // Register the user for the event
        await db("event_registrations").insert({ user_id: userId, event_id: eventId });
        res.status(200).json({ message: "Successfully registered for the event" });
    } catch (error) {
        console.error("Registration failed:", error);
        res.status(500).json({ message: "Registration failed", error });
    }
});

// Delete an event
router.post("/delete", async (req, res) => {
  try {
      const { id } = req.body;

      if (!id) {
          return res.status(400).json({ message: "Event ID is required" });
      }

      const deletedRows = await db("events").where({ id }).del();

      if (deletedRows) {
        console.log("ins")
          res.status(200).json({ message: `Event with ID ${id} deleted successfully` });
      } else {
        console.log("insno")
          res.status(404).json({ message: "Event not found" });
      }
  } catch (error) {
      console.error("Failed to delete event:", error);
      res.status(500).json({ message: "Failed to delete event", error });
  }
});


module.exports = router;
