import express from "express";
import boardService from "../services/board.js";
const router = express.Router();

router.post("/", boardService.createBoard);
router.post("/search", boardService.searchBoards);
router.get("/:id", boardService.getBoardById);

router.post("/:id/share", boardService.createBoardShareLink);
router.get("/:id/share", boardService.getBoardShareLink);
router.delete("/:id/share", boardService.deleteBoardShareLink);
router.post("/:id/join/:token", boardService.joinBoardByLink);

export default router;
