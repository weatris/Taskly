export const socketMiddleware = (req, res, next) => {
  try {
    const io = req.app.get("io");
    if (!io) {
      return res.status(500).json({ error: "Socket.io not initialized" });
    }
    req.socket = io;
  } catch {}

  next();
};
