import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req,res) => {
    const userId = req.params.userId;
    const q = "SELECT id, username, email, name, user_profile_image, location, phone, user_cover_image, birthdate FROM users WHERE username=?"

    db.query(q, [userId], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}
