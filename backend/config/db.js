import { Op, Sequelize } from "sequelize";
import dotenv from "dotenv";
import createUserModel from "../models/user.js";
import createBoardModel from "../models/board.js";
import createBoardMemberModel from "../models/BoardMember.js";
import createTicketModel from "../models/ticket.js";
import createGroupModel from "../models/group.js";
import createTokenModel from "../models/token.js";
import createChatMessageModel from "../models/chatMessage.js";

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
export const Token = createTokenModel(sequelize);
export const Board = createBoardModel(sequelize);
export const Group = createGroupModel(sequelize);
export const BoardMember = createBoardMemberModel(sequelize);
export const Ticket = createTicketModel(sequelize);
export const ChatMessage = createChatMessageModel(sequelize);

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
Ticket.belongsTo(Board, { foreignKey: "boardId", as: "board" });
ChatMessage.belongsTo(Board, { foreignKey: "boardId", as: "board" });
ChatMessage.belongsTo(User, { foreignKey: "userId", as: "user" });
Group.belongsTo(Board, { foreignKey: "boardId", as: "board" });

User.hasMany(BoardMember, { foreignKey: "userId", as: "boardMemberships" });
Board.hasMany(BoardMember, { foreignKey: "boardId", as: "memberShips" });
Board.hasMany(Ticket, { foreignKey: "boardId", as: "tickets" });
Board.hasMany(Group, { foreignKey: "boardId", as: "groups" });

export default { sequelize, Op, User, Board, BoardMember };
