import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class BoardMember extends Model {}

  BoardMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      boardId: {
        type: DataTypes.STRING,
        references: {
          model: "boards",
          key: "id",
        },
        allowNull: false,
        field: "board_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
        field: "user_id",
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "BoardMember",
      tableName: "board_members",
      timestamps: true,
      underscored: true,
    },
  );

  return BoardMember;
};
