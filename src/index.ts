// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// process.on("uncaughtException", (err) => {
//     console.error("UNCAUGHT EXCEPTION:", err);
// });

// process.on("unhandledRejection", (reason) => {
//     console.error("UNHANDLED REJECTION:", reason);
// });

// import connectDatabase from "./database/database";
// import blogRouter from "./route/blog/blog.route";
// import categoryRouter from "./route/category/category.route";
// import teamMemberRouter from "./route/team-member/teamMember.route";
// import authorRouter from "./route/author/author.route";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (_req, res) => {
//     res.status(200).send("Backend is alive");
// });

// app.get("/health", (_req, res) => {
//     res.status(200).send("OK");
// });

// app.use("/user", teamMemberRouter);
// app.use("/blog", blogRouter);
// app.use("/category", categoryRouter);
// app.use("/author", authorRouter);

// console.log("BOOT: index.ts loaded");

// const startServer = async () => {
//     await connectDatabase();

//     const PORT = process.env.PORT || 8080;

//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// };

// startServer();

import express from "express";

const app = express();

app.get("/health", (_req, res) => {
    res.send("OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
