import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", validateBody(loginSchema), AuthController.login);
router.post("/register", validateBody(registerSchema), AuthController.register);
router.get("/me", requireAuth, AuthController.me);
router.post("/logout", AuthController.logout);

router.get("/", (req, res) => {
	return res.json({
		service: "auth",
		endpoints: ["POST /login", "POST /register", "GET /me", "POST /logout"],
	});
});
export default router;
