import mongoose from "mongoose";

export const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "writer"]
    },
    status: {
        type: Boolean,
        default: true
    }
},
    { collection: "team_members" }

)

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember