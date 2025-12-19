import express from "express"
import { createNewTeamMemberController, editTeamMemberController, teamMemberLoginController, updateTeamMemberStatus } from "../../controller/team-member/teamMember.controller.js";
import { verifyAuthTokenAndRole } from "../../middleware/auth.middleware.js";
import { ROLES } from "../../constants/roles.js";
const teamMemberRouter = express.Router();

teamMemberRouter.post("/create", createNewTeamMemberController)

teamMemberRouter.post("/login", teamMemberLoginController)

teamMemberRouter.put("/edit", verifyAuthTokenAndRole([ROLES.admin]), editTeamMemberController)

teamMemberRouter.put("/update-status", verifyAuthTokenAndRole([ROLES.admin]), updateTeamMemberStatus)

export default teamMemberRouter