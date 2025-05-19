const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require("dotenv").config();

const dbFile = process.env.DB_SQLITE_PATH || path.join(__dirname, "../../database/database.sqlite");

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite DB", err.message);
  } else {
    console.log("Connected to SQLite DB");
  }
});

module.exports = db;
