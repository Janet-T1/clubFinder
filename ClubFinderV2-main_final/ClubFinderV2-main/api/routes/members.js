import express from "express";
import {  getMembers } from "../controllers/member.js"
const router = express.Router();

router.get("/:clubId", getMembers);

export default router;
