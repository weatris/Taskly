import express from "express";
import userService from "../services/user.js";
const router = express.Router();

router.post("/", userService.createUser);
router.put("/", userService.updateUser);
router.delete("/", userService.deleteUser);

router.post("/login", userService.login);
router.post("/validate", userService.validateToken);
router.get("/refresh", userService.refreshToken);

router.post("/recover", userService.sendRecoverPasswordForm);
router.post("/recover/validate", userService.validateRecoverPasswordForm);
router.post("/change_password", userService.changePassword);

router.post("/restore_account", userService.sendRestoreAccountForm);
router.post(
  "/restore_account/validate",
  userService.validateRestoreAccountForm,
);

export default router;
