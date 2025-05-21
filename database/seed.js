require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../src/config/database");

const saltRounds = parseInt(process.env.AUTH_SALT_ROUNDS, 10) || 10;

const seedUsers = async () => {
  try {
    // Contoh password di-hash dulu (gunakan bcrypt atau bisa plain kalau cuma demo)
    const passwordHash = await bcrypt.hash("dev2810", saltRounds);
    const passwordHash2 = await bcrypt.hash("pas1234", saltRounds);

    const stmt = db.prepare(`
      INSERT INTO tbl_users00 (username, fullname, password, role, stat_active)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run("develop", "Developer", passwordHash, 0, 1);
    stmt.run("admin", "Administrator", passwordHash2, 1, 1);
    stmt.run("user1", "User One", passwordHash2, 2, 1);
    stmt.run("user2", "User Two", passwordHash2, 2, 1);

    stmt.finalize(() => {
      console.log("Seed users inserted");
      db.close();
    });
  } catch (err) {
    console.error("Seed error:", err);
  }
};

seedUsers();
