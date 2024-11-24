import express from "express";
import boardService from "../services/board.js";
const router = express.Router();

router.post("/", boardService.createBoard);
router.post("/search", boardService.searchBoards);
router.get("/:id", boardService.getBoardById);

export default router;
