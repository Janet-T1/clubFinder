import express from "express";
import { getMyEvents, createEvent } from "../controllers/event.js"
const router = express.Router();

router.get("/my", getMyEvents);
router.post("/", createEvent);

export default router;
