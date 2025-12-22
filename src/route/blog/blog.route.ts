import express from "express";
import { addNewBlogController, deleteBlogController, editBlogController, getAllBlogsController, getBlogBySlugController, getWebsiteBlogsController, globalSearchBlogsController, updateBlogStatusController } from "../../controller/blogs/blogs.controller";
import { verifyAuthTokenAndRole } from "../../middleware/auth.middleware";
import { ROLES } from "../../constants/roles";
const blogRouter = express.Router();

// admin routes
blogRouter.post("/create", verifyAuthTokenAndRole([ROLES.admin, ROLES.writer]), addNewBlogController)

blogRouter.post("/all", verifyAuthTokenAndRole([ROLES.admin, ROLES.writer]), getAllBlogsController)

blogRouter.put("/edit", verifyAuthTokenAndRole([ROLES.admin, ROLES.writer]), editBlogController)

blogRouter.put("/update-status", verifyAuthTokenAndRole([ROLES.admin, ROLES.writer]), updateBlogStatusController)

blogRouter.delete("/delete", verifyAuthTokenAndRole([ROLES.admin, ROLES.writer]), deleteBlogController)

blogRouter.post("/get-by-slug/:slug", verifyAuthTokenAndRole([ROLES.admin, ROLES.writer]), getBlogBySlugController)

// website routes

blogRouter.get("/all-blogs", getWebsiteBlogsController)

blogRouter.get("/blog-detail/:id", getWebsiteBlogsController)

blogRouter.post("/search", globalSearchBlogsController)

export default blogRouter