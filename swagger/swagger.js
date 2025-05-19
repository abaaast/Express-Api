require("dotenv").config(); // pastikan ini di paling atas

const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

// Menambahkan tag ke dokumentasi
const doc = {
  info: {
    title: process.env.SWAGGER_TITLE || "4845 API",
    description: "API documentation for 4845 service",
  },
  host: process.env.SWAGGER_URL || "localhost:3000",
  schemes: ["http"],
  basePath: "/api",
  // tags: tags, // Menambahkan tags otomatis
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter **Bearer** followed by a space and then your token.",
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const outputFile = path.resolve(__dirname, "swagger-output.json");
const endpointsFiles = ["./src/routes/index.js"]; // file yang memuat semua route

swaggerAutogen(outputFile, endpointsFiles, doc);
