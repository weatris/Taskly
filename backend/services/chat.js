import { sequelize, User, ChatMessage } from "../config/db.js";

export async function getChatData(req, res) {
  try {
    const { page } = req.params;
    const { ticketId, boardId } = req.body;
    const pageSize = process.env.PAGE_SIZE;

    const limit = parseInt(pageSize, 10);
    const offset = parseInt(page, 10) * limit;

    const { rows: messages, count: totalMessages } =
      await ChatMessage.findAndCountAll({
        where: ticketId ? { ticketId, boardId } : { boardId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
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
        pageSize,
      },
    });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error retrieving ticket chat data" });
  }
}

export async function createChatMessage(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { ticketId, boardId, message, messageId } = req.body;

    await ChatMessage.create(
      {
        id: messageId,
        boardId,
        content: message,
        ticketId: ticketId,
        userId: req.user.id,
      },
      { transaction },
    );

    await transaction.commit();

    if (req.socket) {
      req.socket.to(ticketId).emit("send_message", { id: messageId });
      req.socket.to(boardId).emit("send_message", { id: messageId });
    }

    res.status(200).json({ message: "Success", id: messageId });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error creating ticket chat message" });
  }
}

export async function getChatMessageById(req, res) {
  try {
    const { id } = req.params;
    const message = await ChatMessage.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json(message);
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Message not found" });
  }
}

export default {
  getChatData,
  createChatMessage,
  getChatMessageById,
};
