import express from "express";
import { addNewAuthorController, editAuthorController, getAllAuthorsController, updateAuthorStatusController } from "../../controller/author/author.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const authorRouter = express.Router();

authorRouter.post("/create", authMiddleware, addNewAuthorController)

authorRouter.get("/all", authMiddleware, getAllAuthorsController)

authorRouter.put("/edit", authMiddleware, editAuthorController)

authorRouter.put("/update-status", authMiddleware, updateAuthorStatusController)

export default authorRouter