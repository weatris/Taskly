import express from "express";
import userService from "../services/user.js";
const router = express.Router();

router.post("/", userService.createUser);
router.post("/login", userService.login);
router.post("/validate", userService.validateToken);
router.get("/refresh", userService.refreshToken);
router.post("/recover", userService.sendRecoverPasswordForm);
router.post("/recover/validate", userService.validateRecoverPasswordForm);
router.post("/change_password", userService.changePassword);

// router.delete("/:id", userService.authenticate, userService.deleteUser);
// router.get("/search/:id", userService.authenticate, userService.getUserById);

export default router;
