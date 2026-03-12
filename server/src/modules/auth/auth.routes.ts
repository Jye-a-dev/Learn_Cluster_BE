import { Router } from "express";
import { AuthController } from "../auth/auth.controller.js";
import {
	loginSchema,
	registerSchema,
	googleLoginSchema
} from "../auth/auth.validator.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

/* ================= AUTH ================= */

router.post("/login", validateBody(loginSchema), AuthController.login);

router.post("/register", validateBody(registerSchema), AuthController.register);

router.post(
	"/google",
	validateBody(googleLoginSchema),
	AuthController.googleLogin
);

router.get("/me", requireAuth, AuthController.me);

router.post("/logout", AuthController.logout);

/* ================= INFO ================= */

router.get("/", (_req, res) => {
	return res.json({
		service: "auth",
		endpoints: [
			"POST /login",
			"POST /register",
			"POST /google",
			"GET /me",
			"POST /logout",
		],
	});
});

export default router;