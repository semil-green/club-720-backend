import express from "express";
import cors from "cors";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
    process.exit(1);
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

const startServer = async () => {
    try {
        await connectDatabase();

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

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () =>
            console.log(`server running : ${PORT}`)
        );
    } catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
};

startServer();
