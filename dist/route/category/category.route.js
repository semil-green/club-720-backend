"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../../controller/category/category.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const categoryRouter = express_1.default.Router();
categoryRouter.post("/create", auth_middleware_1.authMiddleware, category_controller_1.addNewCategoryController);
categoryRouter.get("/all", auth_middleware_1.authMiddleware, category_controller_1.getAllCategoriesController);
categoryRouter.put("/edit", auth_middleware_1.authMiddleware, category_controller_1.editCategoryController);
categoryRouter.put("/update-status", auth_middleware_1.authMiddleware, category_controller_1.updateCategoryStatusController);
exports.default = categoryRouter;
