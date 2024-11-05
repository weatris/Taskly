import { sequelize, Board, Group } from "../config/db.js";

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

export async function renameGroup(req, res) {
  const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { newName } = req.body;
  
      const group = await Group.findByPk(id);
  
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
    
      group.name = newName;
      await group.save({ transaction });
      await transaction.commit();
  
      res.status(200).json({ message: "Group renamed successfully" });;
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating group" });
    }
  }


  export default {
    createGroup,
    renameGroup
  }