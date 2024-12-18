const express = require("express");
const passport = require("../config/microsoftAuth");
const { logout, microsoftCallback } = require("../controllers/authController");

const router = express.Router();

// Microsoft OAuth Login Route
router.get(
  "/microsoft",
  passport.authenticate("azure_ad_oauth2", { scope: ["profile", "email"] })
);

// Microsoft OAuth Callback Route
router.get(
  "/microsoft/callback",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
  microsoftCallback
);

// Logout Route
router.get("/logout", logout);

module.exports = router;
