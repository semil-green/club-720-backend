import express from "express";
import { addNewBlogController, deleteBlogController, editBlogController, getAllBlogsController, getBlogByIdController, getWebsiteBlogsController, globalSearchBlogsController, updateBlogStatusController } from "../../controller/blogs/blogs.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
const blogRouter = express.Router();

// admin routes
blogRouter.post("/create", authMiddleware, addNewBlogController)

blogRouter.post("/all", authMiddleware, getAllBlogsController)

blogRouter.put("/edit", authMiddleware, editBlogController)

blogRouter.put("/update-status", authMiddleware, updateBlogStatusController)

blogRouter.delete("/delete", authMiddleware, deleteBlogController)

blogRouter.post("/get-by-id/:id", authMiddleware, getBlogByIdController)


// website routes

blogRouter.get("/all-blogs", getWebsiteBlogsController)

blogRouter.get("/blog-detail/:id", getWebsiteBlogsController)

blogRouter.post("/search", globalSearchBlogsController)

export default blogRouter