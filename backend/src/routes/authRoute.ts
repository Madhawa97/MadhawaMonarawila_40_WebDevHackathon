import express from "express";
import { loginController, registerController, logoutController} from "../controllers/authController"

const router = express.Router();
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);

export default router;