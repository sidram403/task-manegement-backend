import express from "express";
import { getUser, login, logout,  register } from "../controllers/auth.contoller.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUser", authMiddleware, getUser);

export default router;