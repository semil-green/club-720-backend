import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TeamMember from "../../schema/team-member/teamMember.schema";
import { ROLES } from "../../constants/roles";


export const createNewTeamMemberController = async (req: Request, res: Response) => {

    try {
        const { name, email, password, role, status } = req.body;
        const checkIfEmailExists = await TeamMember.findOne({ email: email });

        if (checkIfEmailExists) {
            res.status(400).send({ result: "Email already exists" });
            return;
        }

        if (!name) {
            res.status(400).send({ result: "Name is required" });
            return;
        }

        if (!email) {
            res.status(400).send({ result: "Email is required" });
            return;
        }

        if (!password) {
            res.status(400).send({ result: "Password is required" });
            return;
        }

        if (!role) {
            res.status(400).send({ result: "Role is required" });
            return;
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const saveNewUser = await TeamMember.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            status: status
        });

        if (saveNewUser) {
            res.status(200).send({ result: saveNewUser, message: role === ROLES.admin ? "Admin created successfully" : "Team member created successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to ceate new user" });
    }
}

export const teamMemberLoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const checkIfEmailExists = await TeamMember.findOne({ email: email });

        if (!checkIfEmailExists) {
            res.status(400).send({ result: "", message: "Email does not exist" });
            return;
        }

        const verifyPassword = await bcrypt.compare(
            password,
            checkIfEmailExists?.password,
        );

        if (!verifyPassword) {
            res.status(400).send({ result: "", message: "Password is incorrect" });
            return;
        }

        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        const authToken = await jwt.sign(
            {
                role: checkIfEmailExists?.role,
            },
            jwtSecretKey,
            { expiresIn: "1d" },
        );

        if (authToken) {
            res
                .status(200)
                .send({ result: "Logged in successfully", auth_token: authToken, role: checkIfEmailExists?.role });
        } else {
            res.status(400).send({ result: "Failed to login" });
        }
    } catch (error) {
        res.status(500).send({ result: "Error in user login" });
    }
};


export const editTeamMemberController = async (req: Request, res: Response) => {

    try {

        const { id, name, email, role, status } = req.body;

        const updateTeamMember = await TeamMember.findByIdAndUpdate(id, {
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
}

export const updateTeamMemberStatus = async (req: Request, res: Response) => {

    try {

        const { id, status } = req.body;

        const updateTeamMemberStatus = await TeamMember.findByIdAndUpdate(id, {
            status
        }, { new: true });

        if (updateTeamMemberStatus) {
            res.status(200).send({ result: updateTeamMemberStatus, message: "Status updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to update status" });
    }
}