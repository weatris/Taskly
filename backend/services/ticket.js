import { sequelize, User, Ticket, Group, ChatMessage } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

export async function createTicket(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { groupId, name, description, assignedTo } = req.body;

    const ticketsWithSelectedGroup = await Ticket.findAll({
      where: {
        groupId: groupId,
      },
    });

    const ticket = await Ticket.create(
      {
        id: generateId(10),
        groupId,
        order: ticketsWithSelectedGroup.length + 1,
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

    res
      .status(200)
      .json({ ...ticket.toJSON(), groupName: group ? group.name : "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving ticket" });
  }
}

export async function changeTicketOrder(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id, order } = req.body;

    const ticketToUpdate = await Ticket.findByPk(id);
    const ticketToSwap = await Ticket.findOne({
      where: { groupId: ticketToUpdate.groupId, order },
    });

    const originalOrder = ticketToUpdate.order;

    ticketToUpdate.order = ticketToSwap.order;
    ticketToSwap.order = originalOrder;

    await ticketToUpdate.save({ transaction });
    await ticketToSwap.save({ transaction });

    await transaction.commit();
    res
      .status(200)
      .json({ message: "Ticket order and groups updated successfully" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error updating ticket order" });
  }
}

export async function changeTicketGroup(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id, groupId } = req.body;

    const ticket = await Ticket.findByPk(id);
    const groupTickets = await Ticket.findAll({
      where: { groupId },
      order: [["order", "ASC"]],
      transaction,
    });

    ticket.groupId = groupId;
    ticket.order =
      (groupTickets.length
        ? Math.max(...groupTickets.map((item) => item.order))
        : 0) + 1;

    await ticket.save({ transaction });

    await transaction.commit();
    res
      .status(200)
      .json({ message: "Ticket order and groups updated successfully" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error updating ticket order" });
  }
}

export async function getTicketChatDataById(req, res) {
  try {
    const { id, page } = req.params;
    const pageSize = process.env.PAGE_SIZE;

    const limit = parseInt(pageSize, 10);
    const offset = parseInt(page, 10) * limit;

    const { rows: messages, count: totalMessages } =
      await ChatMessage.findAndCountAll({
        where: { ticketId: id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

    const remainingItems = Math.max(
      totalMessages - (offset + messages.length),
      0,
    );

    res.status(200).json({
      data: messages,
      meta: {
        totalNumber: totalMessages,
        remainingItems,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalMessages / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving ticket chat data" });
  }
}

export async function createTicketChatMessage(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { message, boardId } = req.body;

    await ChatMessage.create(
      {
        id: generateId(10),
        boardId,
        content: message,
        ticketId: id,
        userId: req.user.id,
      },
      { transaction },
    );

    await transaction.commit();

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating ticket chat message" });
  }
}

export async function setDates(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const ticketToUpdate = await Ticket.findByPk(id);
    ticketToUpdate.startDate = startDate;
    ticketToUpdate.endDate = endDate;

    await ticketToUpdate.save({ transaction });
    await transaction.commit();

    return getTicketById(req, res);
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error updating ticket dates" });
  }
}

export default {
  createTicket,
  getTicketById,
  changeTicketOrder,
  changeTicketGroup,
  getTicketChatDataById,
  createTicketChatMessage,
  setDates,
};
