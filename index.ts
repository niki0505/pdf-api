import express from "express";
import "dotenv/config";
import { initializeFirebaseApp } from "./src/config/firebase.ts";
import pdfRoutes from "./src/routes/pdf.route.ts";

const app: any = express();

initializeFirebaseApp();

const PORT = process.env.PORT;

app.use("/api", pdfRoutes);

app.listen(PORT, () => {
  try {
    console.log(`Server is running on port http://localhost:${PORT}`);
  } catch (error: any) {
    console.error(`Error starting server: ${error.message}`);
  }
});
