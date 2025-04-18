import {
  sequelize,
  User,
  Board,
  BoardMember,
  Ticket,
  Group,
  Token,
  Marker,
} from "../config/db.js";
import { Op } from "sequelize";
import { generateId } from "./../utils/generateId.js";
import { tokenTypes } from "./../config/tokenTypes.js";
import { boardMemberTypes } from "./../config/boardMemberTypes.js";

export async function createBoard(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const user = req.user;
    const board = await Board.create(
      {
        id: generateId(10),
        ...req.body,
      },
      { transaction },
    );

    await BoardMember.create(
      {
        member_id: `${board.id}_${user.id}`,
        boardId: board.id,
        userId: user.id,
        level: boardMemberTypes.owner,
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

export async function updateBoard(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const board = await Board.findByPk(req.params.id);

    board.name = req.body.name;
    board.type = req.body.type;
    board.description = req.body.description;
    await board.save({ transaction });

    await transaction.commit();

    res.status(200).json({ message: "Success" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error updating board" });
  }
}

export async function searchBoards(req, res) {
  try {
    const user = req.user;
    const { name, type } = req.body;

    const where = {};
    if (name) {
      where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }
    if (type && type != "all") {
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
            attributes: ["level", "description"],
          },
        },
      ],
    });

    const formattedBoards = boards
      .filter((board) => {
        return board.members.some((member) => member.id === user.id);
      })
      .map((board) => ({
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
            attributes: ["level", "description"],
          },
        },
        {
          model: Group,
          as: "groups",
          attributes: ["id", "name"],
        },
        {
          model: Ticket,
          as: "tickets",
          attributes: [
            "id",
            "groupId",
            "order",
            "name",
            "description",
            "assignedTo",
            "createdAt",
            "updatedAt",
            "markers",
            "endDate",
            "startDate",
          ],
        },
      ],
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const isMember = board.members.some((member) => member.id === user.id);

    if (!isMember && board.type !== "public") {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json({
      ...board.toJSON(),
      members: board.members.map((member) => {
        const { BoardMember, ...rest } = member.dataValues;
        return {
          ...rest,
          ...BoardMember?.dataValues,
        };
      }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving board" });
  }
}

export async function createBoardShareLink(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const token = await Token.findOne({
      where: { key: id, type: tokenTypes.shareBoard },
    });

    if (token) {
      await token.destroy({ transaction });
    }

    await Token.create(
      {
        value: generateId(20),
        type: tokenTypes.shareBoard,
        key: id,
      },
      { transaction },
    );

    await transaction.commit();

    return res.status(200).json({});
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error sharing board" });
  }
}

export async function getTokenById(id, type, lifetime) {
  try {
    const token = await Token.findOne({ where: { key: id, type } });

    if (token) {
      const tokenAgeInMinutes =
        (Date.now() - new Date(token.createdAt).getTime()) / (1000 * 60);

      if (tokenAgeInMinutes > lifetime) {
        await token.destroy();
        return { value: "" };
      }

      return { value: token.value, key: token.key };
    }

    return { value: "" };
  } catch (err) {
    console.error(err);
    return { value: "" };
  }
}

export async function getBoardShareLink(req, res) {
  const lifetime = parseInt(process.env.SHARE_TOKEN_LIFE_TIME) || 60;

  try {
    const { id } = req.params;
    const { value } = await getTokenById(id, tokenTypes.shareBoard, lifetime);

    return res.status(200).json({ value, lifetime });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error sharing board", value: "", lifetime });
  }
}

export async function deleteBoardShareLink(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const token = await Token.findOne({
      where: { key: id, type: "shareBoard" },
    });

    if (!token) {
      await transaction.rollback();
      return res.status(404).json({ message: "Link not found" });
    }

    await token.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({ message: "Token deleted successfully" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error deleting token" });
  }
}

export async function joinBoardByLink(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id, token } = req.params;
    const lifetime = parseInt(process.env.SHARE_TOKEN_LIFE_TIME) || 60;

    const { value, key } = await getTokenById(
      id,
      tokenTypes.shareBoard,
      lifetime,
    );

    if (value == token) {
      const user = req.user;
      const member = await BoardMember.findByPk(`${key}_${user.id}`);

      if (!member) {
        await BoardMember.create(
          {
            member_id: `${key}_${user.id}`,
            boardId: key,
            userId: user.id,
            level: boardMemberTypes.member,
          },
          { transaction },
        );
      }
      await transaction.commit();
      return res.status(200).json(id);
    }

    return res.status(400);
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error sharing board", value: "" });
  }
}

export async function excludeUserFromBoard(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id, userId } = req.params;

    const member = await BoardMember.findByPk(`${id}_${userId}`);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.level == boardMemberTypes.owner) {
      await BoardMember.destroy({
        where: { boardId: id },
        transaction,
      });
    } else {
      await BoardMember.destroy({
        where: { boardId: id, userId },
        transaction,
      });
    }

    await transaction.commit();
    return res
      .status(200)
      .json({ message: "User removed from board successfully" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error removing user from board" });
  }
}

export async function getBoardMemberData(req, res) {
  try {
    const { id, userId } = req.params;

    const user = await User.findByPk(userId);
    const member = await BoardMember.findByPk(`${id}_${userId}`);

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      ...member.dataValues,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving board member data" });
  }
}

export async function updateMemberInfoFromBoard(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id, userId } = req.params;
    const { description, level } = req.body;

    const member = await BoardMember.findByPk(`${id}_${userId}`);

    if (!member) {
      await transaction.rollback();
      return res.status(404).json({ message: "Board member not found" });
    }

    member.description = description;

    if (boardMemberTypes[level] == boardMemberTypes.owner) {
      const currentOwner = await BoardMember.findOne({
        where: { boardId: id, level: boardMemberTypes.owner },
      });
      currentOwner.level = boardMemberTypes.admin;
      member.level = boardMemberTypes.owner;

      await currentOwner.save({ transaction });
    } else {
      member.level = boardMemberTypes[level];
    }

    await member.save({ transaction });
    await transaction.commit();

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.status(500).json({ message: "Error updating board member data" });
  }
}

export async function createMarker(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id: boardId } = req.params;
    const { name, color, description } = req.body;

    await Marker.create(
      {
        id: generateId(10),
        name,
        color,
        description,
        boardId,
      },
      { transaction },
    );
    await transaction.commit();

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.status(500).json({ message: "Error creating marker" });
  }
}

export async function updateMarker(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { id: boardId } = req.params;
    const { name, color, description, selectedMarker } = req.body;

    const marker = await Marker.findByPk(selectedMarker);

    if (marker.boardId !== boardId) {
      throw "Error";
    }

    marker.name = name;
    marker.color = color;
    marker.description = description;

    await marker.save({ transaction });
    await transaction.commit();

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.status(500).json({ message: "Error updating marker" });
  }
}

export async function deleteMarker(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { marker_id: id } = req.params;
    const marker = await Marker.findByPk(id);

    await marker.destroy({ transaction });
    await transaction.commit();

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.status(500).json({ message: "Error deleting marker" });
  }
}

export async function getMarkers(req, res) {
  try {
    const { id } = req.params;

    const markers = await Marker.findAll({ where: { boardId: id } });

    res.status(200).json(markers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving board" });
  }
}

export default {
  createBoard,
  updateBoard,
  searchBoards,
  getBoardById,

  createBoardShareLink,
  getBoardShareLink,
  deleteBoardShareLink,

  joinBoardByLink,
  excludeUserFromBoard,
  getBoardMemberData,
  updateMemberInfoFromBoard,

  createMarker,
  updateMarker,
  deleteMarker,
  getMarkers,
};
