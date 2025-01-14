import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  class ChatMessage extends Sequelize.Model {}

  ChatMessage.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
      },
      ticketId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ChatMessage",
      tableName: "chatMessages",
      timestamps: true,
      underscored: true,
    },
  );

  return ChatMessage;
};
