import express from "express";
import { getMyClubs, getUserClubs, createClub, getClub } from "../controllers/club.js"
const router = express.Router();

router.get("/", getMyClubs);
router.get("/user/:userIdC", getUserClubs);
router.post("/", createClub);
router.get("/find/:clubId", getClub);

export default router;
