"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDatabase = async () => {
    try {
        const databaseConnection = await mongoose_1.default.connect(process.env.MONGODB_URL ?? "");
        console.log("Connecting to:", process.env.MONGODB_URL);
        if (databaseConnection) {
            console.log("database connected successfully");
        }
        else {
            console.log("Error in database connection");
        }
    }
    catch (error) {
        console.log("Failed to connect with database", error);
    }
};
exports.default = connectDatabase;
