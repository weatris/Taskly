import express from "express";
import chatService from "../services/chat.js";
import { socketMiddleware } from "../services/socket.js";
const router = express.Router();

router.post("/:page", chatService.getChatData);
router.post("/", socketMiddleware, chatService.createChatMessage);
router.get("/:id", chatService.getChatMessageById);

export default router;
