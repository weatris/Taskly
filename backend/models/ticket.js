import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  class Ticket extends Sequelize.Model {}

  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      groupId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      assignedTo: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Ticket",
      tableName: "tickets",
      timestamps: true,
      underscored: true,
    },
  );

  return Ticket;
};
