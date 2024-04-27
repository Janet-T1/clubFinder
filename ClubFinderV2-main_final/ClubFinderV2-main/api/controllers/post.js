import { JSONCookie } from "cookie-parser";
import {db} from "../db.js";
import jwt from "jsonwebtoken"
import moment from "moment"

export const getPosts = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("User not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = 
            `SELECT 
                p.*, 
                u.id AS user_id, 
                u.username AS username,
                u.name AS name, 
                u.user_profile_image,
                c.name AS club_name 
            FROM 
                posts AS p 
            JOIN 
                users AS u 
            ON 
                u.id = p.user_id
            JOIN 
                clubs AS c 
            ON 
                c.id = p.club_id
            JOIN 
                members AS m 
            ON 
                m.club_id = p.club_id AND m.member_id = ?
            ORDER BY 
                p.time_created DESC`

        db.query(q, [userInfo.id], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    }); 
}

export const createPost = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("User not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = 
            "INSERT INTO posts(`content`, `title`, `img`, `time_created`, `user_id`, `club_id`) VALUES (?)";

        const values = [
            req.body.content,
            req.body.title,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.club_id
        ]
        

        db.query(q, [values], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created");
        });
    }); 
}

