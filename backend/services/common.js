import { sequelize, Board, Group, Ticket } from "../config/db.js";

export async function renameItem(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { newName, itemType } = req.body;

    const acceptableTypes = {
      board: Board,
      group: Group,
      ticket: Ticket,
    };

    const group = await acceptableTypes[itemType].findByPk(id);

    if (!group) {
      return res.status(404).json({ message: `${itemType} not found` });
    }

    group.name = newName;
    await group.save({ transaction });
    await transaction.commit();

    res.status(200).json({ message: `${itemType}  renamed successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `${itemType}  updating group` });
  }
}

export default {
  renameItem,
};
