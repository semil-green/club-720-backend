import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
