import express from "express";
import {  getClubImages } from "../controllers/image.js"
const router = express.Router();

router.get("/:clubId", getClubImages);

export default router;
