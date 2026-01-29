import express from "express";
import "dotenv/config";
import { initializeFirebaseApp } from "./src/config/firebase.js";

import pdfRoutes from "./src/routes/pdf.route.js";

const app = express();

initializeFirebaseApp();

const PORT = process.env.PORT;

app.use("/api", pdfRoutes);

app.listen(PORT, () => {
  try {
    console.log(`Server is running on port http://localhost:${PORT}`);
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
});
