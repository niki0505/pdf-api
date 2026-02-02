import express from "express";
import multer from "multer";
import { getURL, uploadPDF } from "../controllers/pdf.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const upload = multer();

const router = express.Router();

router.post("/upload-pdf/:id", authMiddleware, upload.single("pdf"), uploadPDF);

router.get("/get-url/:id", authMiddleware, getURL);

export default router;
