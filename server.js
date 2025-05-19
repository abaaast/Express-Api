require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");

const app = require("./src/app");
const PORT = process.env.APP_PORT || 3000;
const BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`;

// Pasang Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

process.env.SWAGGER_TITLE || "4845 API";

app.listen(PORT, () => {
  console.log(`Server running at ${BASE_URL}`);
  console.log(`Docs API at ${BASE_URL}/api-docs`);
});
