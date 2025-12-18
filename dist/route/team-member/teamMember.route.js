"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teamMember_controller_js_1 = require("../../controller/team-member/teamMember.controller.js");
const auth_middleware_js_1 = require("../../middleware/auth.middleware.js");
const teamMemberRouter = express_1.default.Router();
teamMemberRouter.post("/create", teamMember_controller_js_1.createNewTeamMemberController);
teamMemberRouter.post("/login", teamMember_controller_js_1.teamMemberLoginController);
teamMemberRouter.put("/edit", auth_middleware_js_1.authMiddleware, teamMember_controller_js_1.editTeamMemberController);
teamMemberRouter.put("/update-status", auth_middleware_js_1.authMiddleware, teamMember_controller_js_1.updateTeamMemberStatus);
exports.default = teamMemberRouter;
