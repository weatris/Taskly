import { sequelize, User, Board, BoardMember, Ticket } from "../config/db.js";
import { Op } from "sequelize";

export async function createBoard(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const user = req.user;
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    const { name, type, config } = req.body;
    const board = await Board.create(
      {
        name,
        type,
        config,
      },
      { transaction },
    );

    await BoardMember.create(
      {
        boardId: board.id,
        userId: user.id,
        level: "member",
      },
      { transaction },
    );

    await transaction.commit();

    res.status(200).json({ id: board.id });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error creating board" });
  }
}

export async function searchBoards(req, res) {
  try {
    const { name, type } = req.body;

    const where = {};
    if (name) {
      where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }
    if (type) {
      where.type = type;
    }

    const boards = await Board.findAll({
      where,
      include: [
        {
          model: User,
          as: "members",
          attributes: ["id", "name", "email"],
          through: {
            attributes: ["level"],
          },
        },
      ],
    });

    const formattedBoards = boards.map((board) => ({
      ...board.toJSON(),
      members: board.members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        level: member.BoardMember.level,
      })),
    }));

    res.json(formattedBoards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error searching boards" });
  }
}

export async function getBoardById(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    const board = await Board.findByPk(id, {
      include: [
        {
          model: User,
          as: "members",
          attributes: ["id", "name", "email"],
          through: {
            attributes: ["level"],
          },
        },
        {
          model: Ticket,
          as: "tickets",
          attributes: [
            "id",
            "groupId",
            "name",
            "description",
            "assignedTo",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const isMember = board.members.some((member) => member.id === user.id);

    if (!isMember) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving board" });
  }
}

export async function updateBoard(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const user = req.user;
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    const { id } = req.params;
    const { config } = req.body;

    const board = await Board.findByPk(id);
    if (!board) {
      await transaction.rollback();
      return res.status(404).json({ message: "Board not found" });
    }

    board.config = config;
    await board.save({ transaction });

    await transaction.commit();

    res.status(200).json({ message: "Board updated successfully" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error updating board" });
  }
}

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

export default {
  createBoard,
  searchBoards,
  getBoardById,
  updateBoard,
  createTicket,
};
