"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogs_controller_js_1 = require("../../controller/blogs/blogs.controller.js");
const auth_middleware_js_1 = require("../../middleware/auth.middleware.js");
const blogRouter = express_1.default.Router();
// admin routes
blogRouter.post("/create", auth_middleware_js_1.authMiddleware, blogs_controller_js_1.addNewBlogController);
blogRouter.post("/all", auth_middleware_js_1.authMiddleware, blogs_controller_js_1.getAllBlogsController);
blogRouter.put("/edit", auth_middleware_js_1.authMiddleware, blogs_controller_js_1.editBlogController);
blogRouter.put("/update-status", auth_middleware_js_1.authMiddleware, blogs_controller_js_1.updateBlogStatusController);
blogRouter.delete("/delete", auth_middleware_js_1.authMiddleware, blogs_controller_js_1.deleteBlogController);
blogRouter.post("/get-by-id/:id", auth_middleware_js_1.authMiddleware, blogs_controller_js_1.getBlogByIdController);
// website routes
blogRouter.get("/all-blogs", blogs_controller_js_1.getWebsiteBlogsController);
blogRouter.get("/blog-detail/:id", blogs_controller_js_1.getWebsiteBlogsController);
blogRouter.post("/search", blogs_controller_js_1.globalSearchBlogsController);
exports.default = blogRouter;
