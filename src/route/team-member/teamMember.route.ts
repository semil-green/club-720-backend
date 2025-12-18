import express from "express"
import { createNewTeamMemberController, editTeamMemberController, teamMemberLoginController, updateTeamMemberStatus } from "../../controller/team-member/teamMember.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const teamMemberRouter = express.Router();

teamMemberRouter.post("/create", createNewTeamMemberController)

teamMemberRouter.post("/login", teamMemberLoginController)

teamMemberRouter.put("/edit", authMiddleware, editTeamMemberController)

teamMemberRouter.put("/update-status", authMiddleware, updateTeamMemberStatus)

export default teamMemberRouter