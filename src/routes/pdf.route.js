import express from "express";
import multer from "multer";
import { getURL, uploadPDF } from "../controllers/pdf.controller.js";

const upload = multer();

const router = express.Router();

router.post("/upload-pdf", upload.single("pdf"), uploadPDF);

router.get("/get-url/:id", getURL);

export default router;
