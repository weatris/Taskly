import express from "express";
import ticketService from "../services/ticket.js";
const router = express.Router();

router.post("/:id", ticketService.createTicket);
router.get("/:id", ticketService.getTicketById);

export default router;
