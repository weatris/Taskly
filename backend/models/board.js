import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Board extends Model {}

  Board.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("public", "private", "closed"),
        allowNull: true,
      },
      config: {
        type: {
          groups: DataTypes.ARRAY({
            id: DataTypes.STRING,
            name: DataTypes.STRING,
          }),
        },
        allowNull: true,
        get() {
          const rawValue = this.getDataValue("config");
          return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
          this.setDataValue("config", JSON.stringify(value));
        },
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
