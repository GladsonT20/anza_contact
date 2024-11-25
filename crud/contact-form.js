const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Database setup
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Model definition
const FormSubmission = sequelize.define("FormSubmission", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
});

// Sync database
sequelize.sync();

// Route to fetch all submissions
app.get("/submissions", async (req, res) => {
  try {
    const submissions = await FormSubmission.findAll();
    res.json(submissions); // Send all data as JSON
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
