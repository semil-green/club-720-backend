import mongoose from "mongoose";
export const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
