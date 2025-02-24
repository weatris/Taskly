import express from "express";
import groupService from "../services/group.js";
const router = express.Router();

router.post("/:id", groupService.createGroup);
router.delete("/:id", groupService.deleteGroup);

export default router;
