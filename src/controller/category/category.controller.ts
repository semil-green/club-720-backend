import Category from "../../schema/category/category.schema";
import { Request, Response } from "express";

export const addNewCategoryController = async (req: Request, res: Response) => {

    try {

        const { name, slug, description, status, tags } = req.body;

        const checkIfCategoryExist = await Category.findOne({ name: name });

        if (checkIfCategoryExist) {
            res.status(400).send({ result: "Category already exists" });
            return;
        }

        const saveNewCategory = await Category.create({
            name,
            slug,
            description,
            tags,
            status
        });

        if (saveNewCategory) {
            res.status(200).send({ result: saveNewCategory, message: "Category added successfully" });
        }

    }
    catch (err) {
        res.status(400).send({ result: "Failed to add new category" })
    }
}


export const getAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const page = Number(req.body.page || req.query.page || 1);
        const limit = Number(req.body.limit || req.query.limit || 10);

        const skip = (page - 1) * limit;

        const [categories, totalCategories] = await Promise.all([
            Category.find({})
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Category.countDocuments(),
        ]);

        res.status(200).send({
            categories,
            pagination: {
                total: totalCategories,
                page,
                limit,
                totalPages: Math.ceil(totalCategories / limit),
            },
        });
    } catch (err) {
        res.status(400).send({ result: "Failed to fetch categories" });
    }
};


export const editCategoryController = async (req: Request, res: Response) => {

    try {

        const { id, name, slug, description, tags, status } = req.body;

        const updateCategory = await Category.findByIdAndUpdate(id, {
            name,
            slug,
            description,
            tags,
            status
        }, { new: true });

        if (updateCategory) {
            res.status(200).send({ result: updateCategory, message: "Category updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to edit category" })
    }
}

export const updateCategoryStatusController = async (req: Request, res: Response) => {

    try {

        const { id, status } = req.body;

        const updateCategoryStatus = await Category.findByIdAndUpdate(id, {
            status
        }, { new: true });

        if (updateCategoryStatus) {
            res.status(200).send({ result: updateCategoryStatus, message: "Category status updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to update category status" })
    }
}