"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_controller_js_1 = require("../../controller/author/author.controller.js");
const auth_middleware_js_1 = require("../../middleware/auth.middleware.js");
const roles_js_1 = require("../../constants/roles.js");
const authorRouter = express_1.default.Router();
authorRouter.post("/create", (0, auth_middleware_js_1.verifyAuthTokenAndRole)([roles_js_1.ROLES.admin]), author_controller_js_1.addNewAuthorController);
authorRouter.get("/all", (0, auth_middleware_js_1.verifyAuthTokenAndRole)([roles_js_1.ROLES.admin]), author_controller_js_1.getAllAuthorsController);
authorRouter.put("/edit", (0, auth_middleware_js_1.verifyAuthTokenAndRole)([roles_js_1.ROLES.admin]), author_controller_js_1.editAuthorController);
authorRouter.put("/update-status", (0, auth_middleware_js_1.verifyAuthTokenAndRole)([roles_js_1.ROLES.admin]), author_controller_js_1.updateAuthorStatusController);
exports.default = authorRouter;
