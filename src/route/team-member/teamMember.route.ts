import express from "express"
import { createNewTeamMemberController, editTeamMemberController, getAllTeamMembersController, teamMemberLoginController, updateTeamMemberPasswordController, updateTeamMemberStatus } from "../../controller/team-member/teamMember.controller";
import { verifyAuthTokenAndRole } from "../../middleware/auth.middleware";
import { ROLES } from "../../constants/roles";
const teamMemberRouter = express.Router();

teamMemberRouter.post("/create", createNewTeamMemberController)

teamMemberRouter.post("/login", teamMemberLoginController)

teamMemberRouter.put("/edit", verifyAuthTokenAndRole([ROLES.admin]), editTeamMemberController)

teamMemberRouter.put("/update-status", verifyAuthTokenAndRole([ROLES.admin]), updateTeamMemberStatus)

teamMemberRouter.get("/all", verifyAuthTokenAndRole([ROLES.admin]), getAllTeamMembersController)

teamMemberRouter.put("/update-password", verifyAuthTokenAndRole([ROLES.admin]), updateTeamMemberPasswordController)

export default teamMemberRouter