import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import questionRoute from "./routes/question.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/question", questionRoute);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
