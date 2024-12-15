const express = require("express");
const router = express.Router();

// Login page
router.get("/login", (req, res) => {
    res.render("auth/login", { error: null });
});

// Login process
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    // Simple authentication (replace with proper authentication)
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
        req.session.isAuthenticated = true;
        res.redirect("/admin");
    } else {
        res.render("auth/login", { 
            error: "Invalid credentials" 
        });
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");
});

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect("/auth/login");
    }
};

module.exports = {
    router,
    isAuthenticated
};
