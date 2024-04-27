import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getMembers = (req,res) => {
    const clubId = req.params.clubId;
    const q = `
        SELECT u.id, u.username, u.email, u.name, u.user_profile_image
            FROM members m
        JOIN users u ON m.member_id = u.id
        WHERE m.club_id = ?`

    db.query(q, [clubId], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}
