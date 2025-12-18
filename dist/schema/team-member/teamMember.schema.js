"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamMemberSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.teamMemberSchema = new mongoose_1.default.Schema({
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
}, { collection: "team_members" });
const TeamMember = mongoose_1.default.model("TeamMember", exports.teamMemberSchema);
exports.default = TeamMember;
