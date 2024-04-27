import { db } from "../db.js";

export const getComments = (req, res) => {

    const q = 

    db.query(q, [req.query.post_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}