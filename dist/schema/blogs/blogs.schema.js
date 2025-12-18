"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category"
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Author"
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Published",
        enum: ["Published", "Draft"],
        required: true
    },
});
const Blogs = mongoose_1.default.model("Blogs", blogSchema);
exports.default = Blogs;
