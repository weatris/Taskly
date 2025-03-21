import { sequelize, Board, Group, Ticket, Token } from "../config/db.js";

export async function updateItem(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { newValue, itemType, param = "name" } = req.body;

    const acceptableTypes = {
      board: Board,
      group: Group,
      ticket: Ticket,
    };

    const item = await acceptableTypes[itemType].findByPk(id);

    if (!item) {
      return res.status(404).json({ message: `${itemType} not found` });
    }

    if (param == "name") item.name = newValue;
    else if (param == "description") item.description = newValue;
    else if (param == "markers") item.markers = newValue;
    else if (param == "assignedTo") item.assignedTo = newValue;
    else throw "undefined param";

    await item.save({ transaction });
    await transaction.commit();

    res.status(200).json({ message: `${itemType} updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error updating item` });
  }
}

export default {
  updateItem,
};
