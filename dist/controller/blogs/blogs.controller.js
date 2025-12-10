import Blogs from "../../schema/blogs/blogs.schema";
import { put } from "@vercel/blob";
import multer from "multer";
const upload = multer();
export const addNewBlogController = [
    upload.single("image"),
    async (req, res) => {
        try {
            const { title, description, date, status } = req.body;
            const file = req.file;
            if (!file)
                return res.status(400).send({ message: "No image provided" });
            const blob = await put(`${Date.now()}-${file.originalname}`, file.buffer, {
                access: "public",
            });
            const saveBlog = await Blogs.create({
                title,
                description,
                image: blob.url,
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
export const getAllBlogsController = async (req, res) => {
    try {
        const { page, limit } = req.body;
        const skip = (page - 1) * limit;
        const blogs = await Blogs.find()
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);
        const totalBlogs = await Blogs.countDocuments();
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
export const editBlogController = [
    upload.single("image"),
    async (req, res) => {
        try {
            const { id, title, description, date, status, image } = req.body;
            let imageUrl = image;
            const file = req.file;
            if (file) {
                const blob = await put(`${Date.now()}-${file.originalname}`, file.buffer, { access: "public" });
                imageUrl = blob.url;
            }
            const updateBlog = await Blogs.findByIdAndUpdate(id, {
                title,
                description,
                image: imageUrl,
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
export const updateBlogStatusController = async (req, res) => {
    try {
        const { id, status } = req.body;
        const updateBlogStatus = await Blogs.findByIdAndUpdate(id, {
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
export const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.body;
        const deleteBlog = await Blogs.findByIdAndDelete(id);
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
export const getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findById(id);
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
export const getWebsiteBlogsController = async (req, res) => {
    try {
        const page = Number(req.body.page) || 1;
        const limit = Number(req.body.limit) || 10;
        const skip = (page - 1) * limit;
        const blogs = await Blogs.find()
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);
        const latestBlogs = await Blogs.find()
            .sort({ date: -1 })
            .limit(4);
        const yearStats = await Blogs.aggregate([
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
        const totalBlogs = await Blogs.countDocuments();
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
export const getBlogDetailController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ result: "Blog ID is required" });
        }
        const blog = await Blogs.findById(id);
        if (!blog) {
            return res.status(404).send({ result: "Blog not found" });
        }
        const recentBlogs = await Blogs.find({ _id: { $ne: id } })
            .sort({ date: -1 })
            .limit(4);
        const yearStats = await Blogs.aggregate([
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
export const globalSearchBlogsController = async (req, res) => {
    try {
        const { query = "" } = req.body;
        if (!query.trim()) {
            res.status(200).send({ blogs: [] });
            return;
        }
        const blogs = await Blogs.find({
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
