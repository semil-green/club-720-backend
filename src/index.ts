import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./database/database";
import blogRouter from "./route/blog/blog.route";
import adminRouter from "./route/admin/admin.route";
dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
connectDatabase();

app.use("/user", adminRouter);
app.use("/blog", blogRouter);


app.listen(process.env.MONGODB_PORT, () => console.log(`server running : ${process.env.MONGODB_PORT}`));
