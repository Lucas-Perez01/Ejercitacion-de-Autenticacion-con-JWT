const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const routes = require("./routes/routes.js");
const PORT = process.env.PORT || 3000;

const app = express();
process.env.PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

app.use("/", routes);

// Listen del servidor al puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
