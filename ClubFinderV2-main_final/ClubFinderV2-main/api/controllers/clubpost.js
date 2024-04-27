import { JSONCookie } from "cookie-parser";
import {db} from "../db.js";
import jwt from "jsonwebtoken"
import moment from "moment"


export const getClubPosts = (req,res) => {
    const clubId = req.params.clubId;
    const q = `
        SELECT p.*, u.username, u.name, u.user_profile_image
            FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.club_id = ?;`
    
        

    db.query(q, [clubId], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}




