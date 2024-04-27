import express, { json } from "express";
const app = express();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import clubRoutes from "./routes/clubs.js";
import categoryRoutes from "./routes/categories.js";
import eventsRoutes from "./routes/events.js";
import clubPosts from "./routes/clubposts.js";
import imageRoutes from "./routes/images.js";
import memberRoutes from "./routes/members.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";


app.use(express.json());
app.use(cookieParser());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(cors({origin: "http://localhost:3000"}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer ({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/clubposts",clubPosts);
app.use("/api/images", imageRoutes);
app.use("/api/members", memberRoutes);

app.listen(8800, () => {
    console.log("API working!");
});