import { Token, User } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateToken } from "./../utils.js";
import { sequelize } from "../config/db.js";
import { decodeToken } from "../utils/decodeToken.js";
import { transporter } from "./../config/mail.js";
import { generateId } from "./../utils/generateId.js";
import { tokenTypes } from "./../config/tokenTypes.js";

async function createUser(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(
      {
        id: generateId(10),
        ...req.body,
        password: hashedPassword,
      },
      { transaction },
    );

    const { token, expirationDate } = generateToken(
      user.id,
      process.env.AUTH_TOKEN_LIFE_TIME,
    );

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
      res.status(400).json({ message: "Invalid email or password" });
    } else {
      const isValid = await user.comparePassword(req.body.password);
      if (!isValid) {
        res.status(400).json({ message: "Invalid email or password" });
      } else {
        const { token, expirationDate } = generateToken(
          user.id,
          process.env.AUTH_TOKEN_LIFE_TIME,
        );

        res.json({
          token,
          expirationDate,
          email: user.email,
          name: user.name,
          id: user.id,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
}

async function authenticate(req, res, next) {
  const { decoded, token } = decodeToken(req, false);

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

async function validateToken(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY, {
      ignoreExpiration: true,
    });

    await User.findByPk(decoded.userId);
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

async function refreshToken(req, res) {
  const { decoded, token } = decodeToken(req);

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
        process.env.AUTH_TOKEN_LIFE_TIME,
      );

      return res.json({
        token: newToken,
        expirationDate,
        email: user.email,
        name: user.name,
        id: user.id,
      });
    } else {
      return res.status(400).json({ message: "Token still valid" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

async function sendRecoverPasswordForm(req, res) {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      await transaction.rollback();
      return res.status(200).json({ message: "Code sent" });
    }

    const token = await Token.findOne({ where: { key: req.body.email } });
    if (token) {
      await token.destroy();
    }

    const id = generateId(10);

    await Token.create(
      {
        value: id,
        type: "recoverPassword",
        key: req.body.email,
      },
      { transaction },
    );

    const info = await transporter.sendMail({
      from: "Test message",
      to: process.env.MAIL_USER,
      // to: req.body.email,
      subject: "Recovery code",
      text: `Go to this link to recover your account: ${process.env.FRONTEND_URL}/recover/${id}`, // Plain text fallback
      html: `<p>Go to this link to recover your account:</p>
            <a href="${process.env.FRONTEND_URL}/recover/${id}" target="_blank">Recover Your Account</a>`,
    });

    await transaction.commit();

    return res.status(200).json({ message: "Code sent", info });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
}

async function validateRecoverPasswordForm(req, res) {
  const transaction = await sequelize.transaction();

  try {
    const token = await Token.findOne({
      where: { value: req.body.id, type: tokenTypes.recoverPassword },
    });
    const lifetime = new Date(
      Date.now() - (process.env.TOKEN_LIFE_TIME || 15) * 60 * 1000,
    );

    if (!token) {
      return res.status(400).json({ message: "Invalid code" });
    }

    if (token.createdAt <= lifetime) {
      await token.destroy();
      await transaction.commit();
      return res.status(400).json({ message: "Invalid code" });
    }

    // await token.destroy();
    await transaction.commit();
    return res.status(200).json(token.key);
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
}

async function changePassword(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      const token = await Token.findOne({ where: { key: user.email } });

      await user.save({ transaction });
      await token.destroy({ transaction });

      await transaction.commit();
      return res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return res.status(500).json({ message: "Error" });
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
  validateToken,
  sendRecoverPasswordForm,
  validateRecoverPasswordForm,
  changePassword,
};
