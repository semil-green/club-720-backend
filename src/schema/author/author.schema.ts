import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
})

const Author = mongoose.model("Author", authorSchema);

export default Author