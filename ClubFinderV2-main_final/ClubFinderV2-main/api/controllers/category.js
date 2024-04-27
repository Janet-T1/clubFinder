import { JSONCookie } from "cookie-parser";
import {db} from "../db.js";
import jwt from "jsonwebtoken"
import moment from "moment"

export const getCategories = (req, res) => {
    const q = "SELECT id, name, link, category_img AS image FROM categories"; 

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("No categories found");
        return res.json(data.map(({ id, name, link, image }) => ({ id, name, link, image})));
    });
};
