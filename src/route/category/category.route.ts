import express from "express"
import { addNewCategoryController, editCategoryController, getAllCategoriesController, updateCategoryStatusController } from "../../controller/category/category.controller";
import { verifyAuthTokenAndRole } from "../../middleware/auth.middleware";
import { ROLES } from "../../constants/roles";


const categoryRouter = express.Router();

categoryRouter.post("/create", verifyAuthTokenAndRole([ROLES.admin]), addNewCategoryController)

categoryRouter.get("/all", verifyAuthTokenAndRole([ROLES.admin]), getAllCategoriesController)

categoryRouter.put("/edit", verifyAuthTokenAndRole([ROLES.admin]), editCategoryController)

categoryRouter.put("/update-status", verifyAuthTokenAndRole([ROLES.admin]), updateCategoryStatusController)

export default categoryRouter