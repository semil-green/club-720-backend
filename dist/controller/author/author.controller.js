"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthorStatusController = exports.editAuthorController = exports.getAllAuthorsController = exports.addNewAuthorController = void 0;
const author_schema_1 = __importDefault(require("../../schema/author/author.schema"));
const addNewAuthorController = async (req, res) => {
    try {
        const { name, slug, status } = req.body;
        const checkIfAuthorExist = await author_schema_1.default.findOne({ name: name });
        if (checkIfAuthorExist) {
            res.status(400).send({ result: "Author: Firstname Lastname exists" });
            return;
        }
        const saveNewAuthor = await author_schema_1.default.create({
            name,
            slug,
            status
        });
        if (saveNewAuthor) {
            res.status(200).send({ result: saveNewAuthor, message: "Author: Firstname Lastname successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to add new author" });
    }
};
exports.addNewAuthorController = addNewAuthorController;
const getAllAuthorsController = async (req, res) => {
    try {
        const authors = await author_schema_1.default.find({});
        if (authors) {
            res.status(200).send({ authors });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to fetch authors" });
    }
};
exports.getAllAuthorsController = getAllAuthorsController;
const editAuthorController = async (req, res) => {
    try {
        const { id, name, slug, status } = req.body;
        const updateAuthor = await author_schema_1.default.findByIdAndUpdate(id, {
            name,
            slug,
            status
        }, { new: true });
        if (updateAuthor) {
            res.status(200).send({ result: updateAuthor, message: "Author updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to edit author" });
    }
};
exports.editAuthorController = editAuthorController;
const updateAuthorStatusController = async (req, res) => {
    try {
        const { id, status } = req.body;
        const updateAuthorStatus = await author_schema_1.default.findByIdAndUpdate(id, {
            status
        }, { new: true });
        if (updateAuthorStatus) {
            res.status(200).send({ result: updateAuthorStatus, message: "Author status updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to update author status" });
    }
};
exports.updateAuthorStatusController = updateAuthorStatusController;
