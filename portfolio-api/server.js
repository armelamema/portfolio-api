console.log("Starting server...");
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const connectDB = require("./config/db");
const { router: authRouter, isAuthenticated } = require("./routes/auth");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware order is important
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Routes
app.use("/api", require("./routes/api"));
app.use("/admin", isAuthenticated, require("./routes/admin"));
app.use("/auth", authRouter);

// Home route
app.get("/", (req, res) => {
    res.redirect("/admin");
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", {
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err : {}
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Add at the top with other requires
require("dotenv").config();

// Update your port configuration
const PORT = process.env.PORT || 3000;

// At the bottom of the file
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
