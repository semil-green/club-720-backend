"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../../controller/category/category.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const roles_1 = require("../../constants/roles");
const categoryRouter = express_1.default.Router();
categoryRouter.post("/create", (0, auth_middleware_1.verifyAuthTokenAndRole)([roles_1.ROLES.admin]), category_controller_1.addNewCategoryController);
categoryRouter.get("/all", (0, auth_middleware_1.verifyAuthTokenAndRole)([roles_1.ROLES.admin]), category_controller_1.getAllCategoriesController);
categoryRouter.put("/edit", (0, auth_middleware_1.verifyAuthTokenAndRole)([roles_1.ROLES.admin]), category_controller_1.editCategoryController);
categoryRouter.put("/update-status", (0, auth_middleware_1.verifyAuthTokenAndRole)([roles_1.ROLES.admin]), category_controller_1.updateCategoryStatusController);
exports.default = categoryRouter;
