const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
