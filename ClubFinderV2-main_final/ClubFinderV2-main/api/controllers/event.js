import { JSONCookie } from "cookie-parser";
import {db} from "../db.js";
import jwt from "jsonwebtoken"
import moment from "moment"

export const getMyEvents = (req, res) => {
    const token = req.cookies.accessToken;
    const clubId = req.params.clubId; 
    if (!token) return res.status(401).json("User not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = 
            `SELECT 
                e.id,
                e.name AS event_name,
                e.location,
                e.created_time,
                e.max_attendees,
                e.attendees,
                e.host,
                e.event_image,
                e.time,
                c.name AS club_name,
                c.description AS club_description
            FROM 
                events e
            JOIN 
                clubs c ON e.club_id = c.id
            JOIN 
                members m ON c.id = m.club_id
            WHERE 
                m.member_id = ?;
        `

        db.query(q, [userInfo.id], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    }); 
}

export const getClubEvents = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("User not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        // SQL query to fetch events from a specific club where the user is a member
        const q = `
            SELECT 
                e.id,
                e.name AS event_name,
                e.location,
                e.created_time,
                e.max_attendees,
                e.attendees,
                e.host,
                e.event_image,
                c.name AS club_name,
                c.description AS club_description
            FROM 
                events e
            JOIN 
                clubs c ON e.club_id = c.id
            JOIN 
                members m ON c.id = m.club_id
            WHERE 
                m.member_id = ? AND c.id = ?;
        `;

        // Execute the query with the user ID and club ID
        db.query(q, [userInfo.id, clubId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
}

export const createEvent = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("User not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = 
            "INSERT INTO events (`name`, `location`, `created_time`, `max_attendees`, `host`, `event_image`, `club_id`, `time`) VALUES (?)";

        const values = [
            req.body.event_name,
            req.body.location,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.max_attendee,
            userInfo.id,
            req.body.img,
            req.body.club_id,
            moment(req.body.event_date).format("YYYY-MM-DD HH:mm:ss")
        ]
        
        db.query(q, [values], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created");
        });
    }); 
}