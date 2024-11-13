import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  class Group extends Sequelize.Model {}

  Group.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "groups",
      timestamps: true,
      underscored: true,
    },
  );

  return Group;
};
