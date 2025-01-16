import { Sequelize, DataTypes } from "sequelize";

export default (sequelize) => {
  class Marker extends Sequelize.Model {}

  Marker.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
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
      modelName: "Marker",
      tableName: "markers",
      timestamps: false,
      underscored: true,
    },
  );

  return Marker;
};
