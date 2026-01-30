import express from "express";
import multer from "multer";
import { getURL, uploadPDF } from "../controllers/pdf.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const upload = multer();

const router = express.Router();

router.post("/upload-pdf", authMiddleware, upload.single("pdf"), uploadPDF);

router.get("/get-url/:id", authMiddleware, getURL);

export default router;
