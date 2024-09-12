import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import createUserModel from '../models/user.js';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres'
    }
);

export const User = createUserModel(sequelize);

export default {
  sequelize,
  User
};
