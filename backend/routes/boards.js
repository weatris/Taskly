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
router.post("/:id/exclude/:userId", boardService.excludeUserFromBoard);

router.post("/:id/markers", boardService.createMarker);
router.put("/:id/markers", boardService.updateMarker);
router.delete("/:id/markers/:marker_id", boardService.deleteMarker);
router.get("/:id/markers", boardService.getMarkers);

export default router;
