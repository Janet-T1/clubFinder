import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req,res) => {
    console.log("working...");
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username], (err,data) => {
        
        if (err) return res.status(500).json(err);
        if (data.length === 0 ) return res.status(999).json("Check credentials");

        const checkPass = bcrypt.compareSync(req.body.password, data[0].password);

        if (!checkPass) return res.status(400).json("Check credentials");

        const token = jwt.sign({id: data[0].id }, "secretkey");

        const {password, ...other} = data[0];

        res.cookie("accessToken", token, {
            httpOnly : true,
        }).status(200).json(other);
    });
};

export const register = (req,res) => {
    // Check User in DB
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username], (err,data) => {
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("username taken");

        // Create New User
        const salt = bcrypt.genSaltSync(10);
        const encryptPass = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)"; 
        const v = [req.body.username, req.body.email, encryptPass, req.body.name];

        db.query(q,[v], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Registered");
        });
    });
}

export const logout = (req,res) => {
    res.clearCookie("accessToken", {
        secure : true,
        sameSite : "none"
    }).status(200).json("Logged Out")
}

