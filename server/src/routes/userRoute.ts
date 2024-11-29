import express from "express"
import { signUpController } from "../controllers/users/signUpController"
import { signInController } from "../controllers/users/signInController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { getUsersController } from "../controllers/users/getUsersControllers"

const router = express.Router()

router.post("/sign-up", signUpController)
router.post("/sign-in", signInController)
router.get("/get-users", authMiddleware, getUsersController)

export default router