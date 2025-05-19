require("dotenv").config(); // Load .env kalau diperlukan

const { exec } = require("child_process");
const path = require("path");

const migrateFile = path.join(__dirname, "migrate.js");
const seedFile = path.join(__dirname, "seed.js");

// Fungsi untuk jalankan file .js dengan child_process
const runFile = (filePath) =>
  new Promise((resolve, reject) => {
    exec(`node "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error in ${filePath}:\n`, stderr);
        return reject(error);
      }
      console.log(`✅ ${filePath} output:\n`, stdout);
      resolve();
    });
  });

const runSetup = async () => {
  try {
    console.log("🔧 Menjalankan migrasi...");
    await runFile(migrateFile);

    console.log("🌱 Menjalankan seed...");
    await runFile(seedFile);

    console.log("🚀 Setup selesai.");
  } catch (err) {
    console.error("❗ Setup gagal:", err);
  }
};

runSetup();
