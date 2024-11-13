import express from "express";
import commonService from "../services/common.js";
const router = express.Router();

router.put("/:id", commonService.renameItem);

export default router;
