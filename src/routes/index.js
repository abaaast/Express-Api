const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const todoRoutes = require("./todoRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/todo", todoRoutes);

module.exports = router;
