import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: Boolean,
        default: true
    }
})

const Category = mongoose.model("Category", categorySchema);
export default Category