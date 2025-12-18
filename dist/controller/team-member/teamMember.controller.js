"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamMemberStatus = exports.editTeamMemberController = exports.teamMemberLoginController = exports.createNewTeamMemberController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const teamMember_schema_1 = __importDefault(require("../../schema/team-member/teamMember.schema"));
const createNewTeamMemberController = async (req, res) => {
    try {
        const { name, email, password, role, status } = req.body;
        const checkIfEmailExists = await teamMember_schema_1.default.findOne({ email: email });
        if (checkIfEmailExists) {
            res.status(400).send({ result: "Email already exists" });
            return;
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const saveNewUser = await teamMember_schema_1.default.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            status: status
        });
        if (saveNewUser) {
            res.status(200).send({ result: saveNewUser, message: "Admin created successfully" });
        }
    }
    catch (err) {
        console.log("err ", err);
        res.status(400).send({ result: "Failed to ceate new user" });
    }
};
exports.createNewTeamMemberController = createNewTeamMemberController;
const teamMemberLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkIfEmailExists = await teamMember_schema_1.default.findOne({ email: email });
        if (!checkIfEmailExists) {
            res.status(400).send({ result: "Email does not exist" });
            return;
        }
        const verifyPassword = await bcrypt_1.default.compare(password, checkIfEmailExists?.password);
        if (!verifyPassword) {
            res.status(400).send({ result: "Password is incorrect" });
            return;
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const authToken = await jsonwebtoken_1.default.sign({
            email: checkIfEmailExists?.email,
        }, jwtSecretKey, { expiresIn: "1y" });
        if (authToken) {
            res
                .status(200)
                .send({ result: "Logged in successfully", auth_token: authToken, role: checkIfEmailExists?.role });
        }
        else {
            res.status(400).send({ result: "Failed to login" });
        }
    }
    catch (error) {
        res.status(500).send({ result: "Error in user login" });
    }
};
exports.teamMemberLoginController = teamMemberLoginController;
const editTeamMemberController = async (req, res) => {
    try {
        const { id, name, email, role, status } = req.body;
        const updateTeamMember = await teamMember_schema_1.default.findByIdAndUpdate(id, {
            name,
            email,
            role,
            status
        }, { new: true });
        if (updateTeamMember) {
            res.status(200).send({ result: updateTeamMember, message: "Team member updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to edit team member" });
    }
};
exports.editTeamMemberController = editTeamMemberController;
const updateTeamMemberStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const updateTeamMemberStatus = await teamMember_schema_1.default.findByIdAndUpdate(id, {
            status
        }, { new: true });
        if (updateTeamMemberStatus) {
            res.status(200).send({ result: updateTeamMemberStatus, message: "Team member status updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to update team member status" });
    }
};
exports.updateTeamMemberStatus = updateTeamMemberStatus;
