import { sequelize, Board, Group, Ticket } from "../config/db.js";
import { generateId } from "../utils/generateId.js";

export async function createGroup(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { name } = req.body;

    const board = await Board.findByPk(id);
    if (!board) {
      await transaction.rollback();
      return res.status(404).json({ message: "Board not found" });
    }

    await Group.create(
      {
        id: generateId(10),
        name,
        boardId: board.id,
      },
      { transaction },
    );

    await transaction.commit();

    res.status(200).json({ message: "Group created successfully" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error creating group" });
  }
}

export async function deleteGroup(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const group = await Group.findByPk(id);
    if (!group) {
      await transaction.rollback();
      return res.status(404).json({ message: "Group not found" });
    }

    const tickets = await Ticket.findAll({ where: { groupId: group.id } });

    tickets.forEach(async (element) => {
      element.groupId = "";
      element.order = 0;
      await element.save({ transaction });
    });

    await group.destroy({ transaction });
    await transaction.commit();

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error deleting group" });
  }
}

export default {
  createGroup,
  deleteGroup,
};
