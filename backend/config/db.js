import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import createUserModel from "../models/user.js";
import createBoardModel from "../models/board.js";
import createBoardMemberModel from "../models/BoardMember.js";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
);

export const User = createUserModel(sequelize);
export const Board = createBoardModel(sequelize);
export const BoardMember = createBoardMemberModel(sequelize);

User.belongsToMany(Board, {
  through: BoardMember,
  foreignKey: "userId",
  otherKey: "boardId",
  as: "boards",
});

Board.belongsToMany(User, {
  through: BoardMember,
  foreignKey: "boardId",
  otherKey: "userId",
  as: "members",
});

BoardMember.belongsTo(User, { foreignKey: "userId", as: "user" });
BoardMember.belongsTo(Board, { foreignKey: "boardId", as: "board" });

User.hasMany(BoardMember, { foreignKey: "userId", as: "boardMemberships" });
Board.hasMany(BoardMember, { foreignKey: "boardId", as: "memberShips" });

export default { sequelize, User, Board, BoardMember };
