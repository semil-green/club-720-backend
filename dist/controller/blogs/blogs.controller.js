"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalSearchBlogsController = exports.getBlogDetailController = exports.getWebsiteBlogsController = exports.getBlogByIdController = exports.deleteBlogController = exports.updateBlogStatusController = exports.editBlogController = exports.getAllBlogsController = exports.addNewBlogController = void 0;
const blogs_schema_js_1 = __importDefault(require("../../schema/blogs/blogs.schema.js"));
const blob_1 = require("@vercel/blob");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
exports.addNewBlogController = [
    upload.single("image"),
    async (req, res) => {
        try {
            const { title, slug, description, image, category, author, date, status } = req.body;
            const file = req.file;
            if (!file)
                return res.status(400).send({ message: "No image provided" });
            const blob = await (0, blob_1.put)(`${Date.now()}-${file.originalname}`, file.buffer, {
                access: "public",
            });
            const saveBlog = await blogs_schema_js_1.default.create({
                title,
                slug,
                description,
                image: blob.url,
                category,
                author,
                date,
                status,
            });
            return res.status(200).send({
                message: "Blog added successfully",
                result: saveBlog,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ message: "Failed to add new blog" });
        }
    },
];
const getAllBlogsController = async (req, res) => {
    try {
        const page = Number(req.body.page || req.query.page || 1);
        const limit = Number(req.body.limit || req.query.limit || 10);
        const search = String(req.body.search || req.query.search || "").trim();
        const skip = (page - 1) * limit;
        let filter = {};
        if (search !== "") {
            filter = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ]
            };
        }
        const blogs = await blogs_schema_js_1.default.find(filter)
            .populate("category")
            .populate("author")
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);
        const totalBlogs = await blogs_schema_js_1.default.countDocuments(filter);
        res.status(200).send({
            blogs,
            pagination: {
                totalBlogs,
                page,
                limit,
                totalPages: Math.ceil(totalBlogs / limit)
            }
        });
    }
    catch (err) {
        res.status(400).send({ result: "Failed to fetch blogs" });
    }
};
exports.getAllBlogsController = getAllBlogsController;
exports.editBlogController = [
    upload.single("image"),
    async (req, res) => {
        try {
            const { id, title, slug, description, image, category, author, date, status } = req.body;
            let imageUrl = image;
            const file = req.file;
            if (file) {
                const blob = await (0, blob_1.put)(`${Date.now()}-${file.originalname}`, file.buffer, { access: "public" });
                imageUrl = blob.url;
            }
            const updateBlog = await blogs_schema_js_1.default.findByIdAndUpdate(id, {
                title,
                slug,
                description,
                image: imageUrl,
                category,
                author,
                date,
                status,
            }, { new: true });
            return res.status(200).send({
                message: "Blog updated successfully",
                result: updateBlog,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ message: "Failed to update blog" });
        }
    },
];
const updateBlogStatusController = async (req, res) => {
    try {
        const { id, status } = req.body;
        const updateBlogStatus = await blogs_schema_js_1.default.findByIdAndUpdate(id, {
            status: status,
        });
        if (updateBlogStatus) {
            res.status(200).send({ message: "Blog status updated successfully", result: updateBlogStatus });
        }
        else {
            res.status(400).send({ message: "Failed to update blog status" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to update blog status" });
    }
};
exports.updateBlogStatusController = updateBlogStatusController;
const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.body;
        const deleteBlog = await blogs_schema_js_1.default.findByIdAndDelete(id);
        if (deleteBlog) {
            res.status(200).send({ message: "Blog deleted successfully", result: deleteBlog });
        }
        else {
            res.status(400).send({ message: "Failed to delete blog" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to delete blog" });
    }
};
exports.deleteBlogController = deleteBlogController;
const getBlogByIdController = async (req, res) => {
    try {
        const { slug } = req.body;
        const blog = await blogs_schema_js_1.default.findOne({ slug });
        if (blog) {
            res.status(200).send({ message: "Blog fetched successfully", result: blog });
        }
        else {
            res.status(400).send({ message: "Failed to fetch blog" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to fetch blog" });
    }
};
exports.getBlogByIdController = getBlogByIdController;
const getWebsiteBlogsController = async (req, res) => {
    try {
        const page = Number(req.body.page) || 1;
        const limit = Number(req.body.limit) || 10;
        const skip = (page - 1) * limit;
        const blogs = await blogs_schema_js_1.default.find()
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);
        const latestBlogs = await blogs_schema_js_1.default.find()
            .sort({ date: -1 })
            .limit(4);
        const yearStats = await blogs_schema_js_1.default.aggregate([
            {
                $group: {
                    _id: { $year: { $toDate: "$date" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": -1 } },
            {
                $project: {
                    year: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);
        const totalBlogs = await blogs_schema_js_1.default.countDocuments();
        res.status(200).send({
            blogs,
            pagination: {
                totalBlogs,
                page,
                limit,
                totalPages: Math.ceil(totalBlogs / limit)
            },
            latestBlogs,
            yearStats
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ result: "Failed to fetch blogs" });
    }
};
exports.getWebsiteBlogsController = getWebsiteBlogsController;
const getBlogDetailController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ result: "Blog ID is required" });
        }
        const blog = await blogs_schema_js_1.default.findById(id);
        if (!blog) {
            return res.status(404).send({ result: "Blog not found" });
        }
        const recentBlogs = await blogs_schema_js_1.default.find({ _id: { $ne: id } })
            .sort({ date: -1 })
            .limit(4);
        const yearStats = await blogs_schema_js_1.default.aggregate([
            {
                $group: {
                    _id: { $year: { $toDate: "$date" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": -1 } },
            {
                $project: {
                    year: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);
        res.status(200).send({
            blog,
            recentBlogs,
            yearStats
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ result: "Failed to fetch blog detail" });
    }
};
exports.getBlogDetailController = getBlogDetailController;
const globalSearchBlogsController = async (req, res) => {
    try {
        const { query = "" } = req.body;
        if (!query.trim()) {
            res.status(200).send({ blogs: [] });
            return;
        }
        const blogs = await blogs_schema_js_1.default.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        })
            .sort({ date: -1 })
            .limit(20);
        res.status(200).send({ blogs });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ result: "Failed to search blogs" });
    }
};
exports.globalSearchBlogsController = globalSearchBlogsController;
