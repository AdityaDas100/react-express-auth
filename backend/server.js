import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";
dotenv.config();
//7NMHsCITUFQ6W4BM
//fragstarwow_db_user
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/api/users", authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});
