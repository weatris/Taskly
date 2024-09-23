import express from "express";
import userRoutes from "./user.js";
import boardRoutes from "./boards.js";
import userService from "../services/user.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/boards", userService.authenticate, boardRoutes);

export default router;
