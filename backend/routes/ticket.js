import express from "express";
import ticketService from "../services/ticket.js";
const router = express.Router();

router.post("/:id", ticketService.createTicket);
router.get("/:id", ticketService.getTicketById);
router.put("/", ticketService.updateTicket);
router.put("/:id/dates", ticketService.setDates);

export default router;
