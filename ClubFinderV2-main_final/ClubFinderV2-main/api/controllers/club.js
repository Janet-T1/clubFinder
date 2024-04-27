import { JSONCookie } from "cookie-parser";
import {db} from "../db.js";
import jwt from "jsonwebtoken"
import moment from "moment"

export const getMyClubs = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("User not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = `
            SELECT c.id, c.name, c.member_count, c.image
            FROM clubs c
            JOIN members m ON m.club_id = c.id
            WHERE m.member_id = ?`

        db.query(q, [userInfo.id], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    }); 
}

export const getClub = (req,res) => {
    const clubId = req.params.clubId;
    const q = `
        SELECT 
        clubs.*, 
        categories.name AS category_name
    FROM 
        clubs
    JOIN 
        categories 
    ON 
        clubs.clubCategory = categories.id
    WHERE 
        clubs.id = ?`

    db.query(q, [clubId], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}

export const getUserClubs = (req,res) => {
    const userIdC = req.params.userIdC;
    const q = `
        SELECT c.id, c.name, c.member_count, c.image
        FROM clubs c
        JOIN members m ON m.club_id = c.id
        WHERE m.member_id = ?`

    db.query(q, [userIdC], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}


export const createClub = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("User not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = 
            "INSERT INTO clubs(`name`, `date_created`, `description`, `member_max`, `image`, `manager`, `clubCategory`) VALUES (?)";

        const values = [
            req.body.club_name,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.description,
            req.body.max_members,
            req.body.img,
            userInfo.id,
            req.body.club_category
        ]
        
        db.query(q, [values], (err,data) => {
            if (err) return res.status(500).json(err);

            const newClubId = data.insertId;
            console.log(newClubId);

            const q =
                "INSERT INTO members (`club_id`, `member_id`) VALUES (?, ?)";
            db.query(q, [newClubId, userInfo.id], (err, memberData) => {
                if (err) return res.status(500).json("Club created, but member add failed");
                return res.status(200).json("Club and initial member add success");
            });
        });
    }); 
}

