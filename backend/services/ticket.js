import { sequelize, Ticket, Group } from "../config/db.js";
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

async function updateTicketOrder(groupId, transaction) {
  const tickets = await Ticket.findAll({
    where: { groupId: groupId },
    order: [["order", "ASC"]],
    transaction,
  });

  const updatePromises = tickets.map((ticket, index) => {
    ticket.order = index + 1;
    return ticket.save({ transaction });
  });

  await Promise.all(updatePromises);
}

export async function updateTicket(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id, targetId, groupId } = req.body;

    const ticketToUpdate = await Ticket.findByPk(id);
    const originalGroup = ticketToUpdate.groupId;
    const originalOrder = ticketToUpdate.order;

    if (!targetId) {
      const maxOrderTicket = await Ticket.findOne({
        where: { groupId: groupId },
        order: [["order", "DESC"]],
      });

      ticketToUpdate.order = maxOrderTicket ? maxOrderTicket.order + 1 : 1;
      if (groupId) {
        ticketToUpdate.groupId = groupId;
      }
      await ticketToUpdate.save({ transaction });
      await updateTicketOrder(originalGroup, transaction);
      await updateTicketOrder(groupId, transaction);
    } else {
      const targetTicket = await Ticket.findByPk(targetId);

      ticketToUpdate.groupId = targetTicket.groupId;

      ticketToUpdate.order = targetTicket.order;
      if (originalOrder < targetTicket.order)
        targetTicket.order = targetTicket.order - 1;
      else targetTicket.order = targetTicket.order + 1;

      await ticketToUpdate.save({ transaction });
      await targetTicket.save({ transaction });

      await updateTicketOrder(ticketToUpdate.groupId, transaction);

      if (originalGroup !== targetTicket.groupId) {
        await updateTicketOrder(originalGroup, transaction);
      }
    }

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
  updateTicket,
  changeTicketGroup,
  setDates,
};
