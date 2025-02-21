import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Board extends Model {}

  Board.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("public", "private", "closed"),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Board",
      tableName: "boards",
      timestamps: true,
      underscored: true,
    },
  );

  return Board;
};
