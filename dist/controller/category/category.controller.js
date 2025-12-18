"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryStatusController = exports.editCategoryController = exports.getAllCategoriesController = exports.addNewCategoryController = void 0;
const category_schema_1 = __importDefault(require("../../schema/category/category.schema"));
const addNewCategoryController = async (req, res) => {
    try {
        const { name, slug, description, status, tags } = req.body;
        const checkIfCategoryExist = await category_schema_1.default.findOne({ name: name });
        if (checkIfCategoryExist) {
            res.status(400).send({ result: "Category already exists" });
            return;
        }
        const saveNewCategory = await category_schema_1.default.create({
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
        res.status(400).send({ result: "Failed to add new category" });
    }
};
exports.addNewCategoryController = addNewCategoryController;
const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await category_schema_1.default.find({});
        if (categories) {
            res.status(200).send({ categories });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to fetch categories" });
    }
};
exports.getAllCategoriesController = getAllCategoriesController;
const editCategoryController = async (req, res) => {
    try {
        const { id, name, slug, description, tags, status } = req.body;
        const updateCategory = await category_schema_1.default.findByIdAndUpdate(id, {
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
        res.status(400).send({ result: "Failed to edit category" });
    }
};
exports.editCategoryController = editCategoryController;
const updateCategoryStatusController = async (req, res) => {
    try {
        const { id, status } = req.body;
        const updateCategoryStatus = await category_schema_1.default.findByIdAndUpdate(id, {
            status
        }, { new: true });
        if (updateCategoryStatus) {
            res.status(200).send({ result: updateCategoryStatus, message: "Category status updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to update category status" });
    }
};
exports.updateCategoryStatusController = updateCategoryStatusController;
