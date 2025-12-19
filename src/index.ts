import express from "express";
import cors from "cors";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
});

import connectDatabase from "./database/database.js";
import blogRouter from "./route/blog/blog.route.js";
import categoryRouter from "./route/category/category.route.js";
import teamMemberRouter from "./route/team-member/teamMember.route.js";
import authorRouter from "./route/author/author.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).send("Backend is alive");
});

app.get("/health", (_req, res) => {
    res.status(200).send("OK");
});

app.use("/user", teamMemberRouter);
app.use("/blog", blogRouter);
app.use("/category", categoryRouter);
app.use("/author", authorRouter);

const startServer = async () => {
    try {
        await connectDatabase();
    } catch (err) {
        console.error("Database connection failed, continuing without DB", err);
    }

    const PORT = process.env.PORT;
    if (!PORT) {
        throw new Error("PORT is not defined");
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
