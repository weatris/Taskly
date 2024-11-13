import express from "express";
import groupService from "../services/group.js";
const router = express.Router();

router.post("/:id", groupService.createGroup);

export default router;
