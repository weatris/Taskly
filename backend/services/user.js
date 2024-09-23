import { User } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "./../utils.js";
import { sequelize } from "../config/db.js";
import { decodeToken } from "../utils/decodeToken.js";

const tokenLifeTime = "1h";

async function createUser(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(
      {
        ...req.body,
        password: hashedPassword,
      },
      { transaction },
    );

    const { token, expirationDate } = generateToken(user.id, tokenLifeTime);

    await transaction.commit();

    res.json({
      email: user.email,
      name: user.name,
      expirationDate,
      token,
    });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.update(req.body);
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.destroy();
      res.json({ message: "User deleted" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      const isValid = await user.comparePassword(req.body.password);
      if (!isValid) {
        res.status(401).json({ message: "Invalid email or password" });
      } else {
        const { token, expirationDate } = generateToken(user.id, tokenLifeTime);

        res.json({ token, expirationDate, email: user.email, name: user.name });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
}

async function authenticate(req, res, next) {
  const {decoded, token} = decodeToken(req, false);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
}

async function refreshToken(req, res) {
  const {decoded, token} = decodeToken(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiration = decoded.exp;

    if (tokenExpiration - currentTime < 15 * 60) {
      const { token: newToken, expirationDate } = generateToken(
        user.id,
        tokenLifeTime,
      );

      return res.json({
        token: newToken,
        expirationDate,
        email: user.email,
        name: user.name,
      });
    } else {
      return res.status(400).json({ message: "Token still valid" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  refreshToken,
  authenticate,
};
