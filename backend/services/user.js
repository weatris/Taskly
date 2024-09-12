import {User} from '../config/db.js';
import jwt from 'jsonwebtoken'

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      await user.update(req.body);
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      await user.destroy();
      res.json({ message: 'User deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      const isValid = await user.comparePassword(req.body.password);
      if (!isValid) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
          expiresIn: '1h'
        });
        res.json({ token });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
}

async function authenticate(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
}

async function refreshToken(req, res) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, { ignoreExpiration: true }); // Ignore expiration to verify token content
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiration = decoded.exp;

    if (tokenExpiration - currentTime < 15 * 60) {
      const newToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: '1h'
      });

      return res.json({ token: newToken });
    } else {
      return res.status(400).json({ message: 'Token still valid' });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  refreshToken,
  authenticate
};