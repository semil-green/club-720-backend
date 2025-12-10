import express from "express"
import { createNewUserController, userLoginController } from "../../controller/admin/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/create", createNewUserController)

adminRouter.post("/login", userLoginController)

export default adminRouter