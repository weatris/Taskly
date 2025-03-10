import express from "express";
import userRoutes from "./user.js";
import boardRoutes from "./boards.js";
import ticketRoutes from "./ticket.js";
import groupRoutes from "./group.js";
import commonRoutes from "./common.js";
import chatRoutes from "./chat.js";
import userService from "../services/user.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/boards", userService.authenticate, boardRoutes);
router.use("/groups", userService.authenticate, groupRoutes);
router.use("/ticket", userService.authenticate, ticketRoutes);
router.use("/chat", userService.authenticate, chatRoutes);
router.use("/common", userService.authenticate, commonRoutes);

export default router;
