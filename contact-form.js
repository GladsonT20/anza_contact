const express = require("express");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public folder

// Database setup (SQLite for simplicity)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Define a model for the form submissions
const FormSubmission = sequelize.define("FormSubmission", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
});

// Sync the database (creates the table if it doesn't exist)
sequelize.sync().then(() => console.log("Database synced!"));

// API route to handle form submissions
app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Save form data to the database
    const submission = await FormSubmission.create({ name, email, message });
    res.status(201).json({ success: true, message: "Form submitted successfully!", data: submission });
  } catch (error) {
    console.error("Error saving form submission:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
