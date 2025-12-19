import express from "express";
import { addNewAuthorController, editAuthorController, getAllAuthorsController, updateAuthorStatusController } from "../../controller/author/author.controller";
import { verifyAuthTokenAndRole } from "../../middleware/auth.middleware";
import { ROLES } from "../../constants/roles";

const authorRouter = express.Router();

authorRouter.post("/create", verifyAuthTokenAndRole([ROLES.admin]), addNewAuthorController)

authorRouter.get("/all", verifyAuthTokenAndRole([ROLES.admin]), getAllAuthorsController)

authorRouter.put("/edit", verifyAuthTokenAndRole([ROLES.admin]), editAuthorController)

authorRouter.put("/update-status", verifyAuthTokenAndRole([ROLES.admin]), updateAuthorStatusController)

export default authorRouter