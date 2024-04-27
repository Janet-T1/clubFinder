import express from "express";
import {  getClubPosts } from "../controllers/clubpost.js"
const router = express.Router();

router.get("/:clubId", getClubPosts);

export default router;
