import express from "express";
import groupService from "../services/group.js";
const router = express.Router();

router.post("/:id", groupService.createGroup);
router.put("/:id", groupService.renameGroup);

export default router;
