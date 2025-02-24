import express from "express";
import ticketService from "../services/ticket.js";
const router = express.Router();

router.post("/:id", ticketService.createTicket);
router.get("/:id", ticketService.getTicketById);
router.put("/change_order", ticketService.changeTicketOrder);
router.put("/change_group", ticketService.changeTicketGroup);

router.get("/:id/chat/:page", ticketService.getTicketChatDataById);
router.post("/:id/chat", ticketService.createTicketChatMessage);
router.put("/:id/dates", ticketService.setDates);

export default router;
