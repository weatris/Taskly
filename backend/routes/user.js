import express from "express";
import userService from "../services/user.js";
const router = express.Router();

router.post("/", userService.createUser);
router.post("/login", userService.login);
router.get("/refresh", userService.refreshToken);

router.delete("/:id", userService.authenticate, userService.deleteUser);
router.get("/search/:id", userService.authenticate, userService.getUserById);

export default router;
