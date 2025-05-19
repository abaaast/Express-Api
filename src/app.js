const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes");
const protectUnless = require("./middlewares/protectUnless");

app.use(express.json());
app.use(morgan("dev"));

// Proteksi global kecuali path tertentu
app.use(protectUnless(["/api/auth/login", "/api/auth/register", "/api-docs"]));

// Routes
app.use("/api", routes);

module.exports = app;
