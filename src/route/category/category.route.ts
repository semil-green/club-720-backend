import express from "express"
import { addNewCategoryController, editCategoryController, getAllCategoriesController, updateCategoryStatusController } from "../../controller/category/category.controller";
import { authMiddleware } from "../../middleware/auth.middleware";


const categoryRouter = express.Router();


categoryRouter.post("/create", authMiddleware, addNewCategoryController)

categoryRouter.get("/all", authMiddleware, getAllCategoriesController)

categoryRouter.put("/edit", authMiddleware, editCategoryController)

categoryRouter.put("/update-status", authMiddleware, updateCategoryStatusController)

export default categoryRouter