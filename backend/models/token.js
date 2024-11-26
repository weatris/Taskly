import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  class Token extends Sequelize.Model {}

  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Token",
      tableName: "tokens",
      timestamps: true,
      underscored: true,
    },
  );

  return Token;
};
