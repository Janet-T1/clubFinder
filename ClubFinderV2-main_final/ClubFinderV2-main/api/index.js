import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

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

// CORS configuration
app.use(
  cors({
    origin: "https://club-finder-five.vercel.app",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Fix SameSite cookie issue
app.get("/set-cookie", (req, res) => {
  res.cookie("exampleCookie", "value", {
    httpOnly: true,
    secure: true, // Required for SameSite: None
    sameSite: "None", // Allows cross-origin requests
  });
  res.send("Cookie set!");
});

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/clubposts", clubPosts);
app.use("/api/images", imageRoutes);
app.use("/api/members", memberRoutes);

// Server setup
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("API working!");
});

export default app;
