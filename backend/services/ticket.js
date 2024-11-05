import { sequelize, User, Board, Ticket } from "../config/db.js";

export async function createTicket(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { groupId, name, description, assignedTo } = req.body;
  
      const board = await Board.findByPk(id);
      if (!board) {
        await transaction.rollback();
        return res.status(404).json({ message: "Board not found" });
      }
  
      const ticket = await Ticket.create(
        {
          groupId,
          name,
          description,
          assignedTo,
          boardId: board.id,
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
      const user = req.user;
      const { id } = req.params;
  
      const board = await Board.findByPk(id, {include: [
        {
          model: User,
          as: "members",
          attributes: ["id", "name", "email"],
          through: {
            attributes: ["level"],
          },
        }]});
  
      if (!board) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      const isMember = board.members.some((member) => member.id === user.id);
  
      if (!isMember) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      const ticket = await Ticket.findByPk(id);
  
      res.status(200).json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving ticket" });
    }
  }


  export default {
    createTicket,
    getTicketById
  }