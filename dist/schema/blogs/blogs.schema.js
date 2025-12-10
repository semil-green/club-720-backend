import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {
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
const Blogs = mongoose.model("Blogs", blogSchema);
export default Blogs;
