import { JSONCookie } from "cookie-parser";
import {db} from "../db.js";
import jwt from "jsonwebtoken"
import moment from "moment"


export const getClubImages = (req,res) => {
    const clubId = req.params.clubId;
    const q = `
        SELECT p.*
        FROM posts p
        WHERE p.club_id = ?`

    db.query(q, [clubId], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}




