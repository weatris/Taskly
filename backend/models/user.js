import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize) => {
  class User extends Sequelize.Model {}

  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
    },
  );

  User.prototype.comparePassword = async function (password) {
    const hash = this.password;
    return bcrypt.compare(password, hash);
  };

  return User;
};
