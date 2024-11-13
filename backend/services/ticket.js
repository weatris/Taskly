import { sequelize, User, Board, Ticket, Group } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

export async function createTicket(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { groupId, name, description, assignedTo } = req.body;
  
      const ticket = await Ticket.create(
        {
          id: generateId(10),
          groupId,
          name,
          description,
          assignedTo,
          boardId: id,
        },
        { transaction },
      );
  
      await transaction.commit();
  
      res.status(200).json({ message: "Ticket created successfully", ticket });
    } catch (err) {
      await transaction.rollback();
      console.error(err);
      res.status(500).json({ message: "Error updating board" });
    }
  }

export async function getTicketById(req, res) {
    try {
      const { id } = req.params;
  
      const ticket = await Ticket.findByPk(id);
      const group = await Group.findByPk(ticket.groupId);
  
      res.status(200).json({...ticket.toJSON(), groupName:group.name});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving ticket" });
    }
  }


  export default {
    createTicket,
    getTicketById
  }