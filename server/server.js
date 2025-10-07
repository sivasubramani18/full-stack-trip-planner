import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

connectDb();

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});
app.use("/api/users", userRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});