import { Router } from "express";
import { ConfigController } from "./controller.js";

const router = Router();

router.get("/public", ConfigController.getPublicConfig);

router.get("/", (_req, res) => {
	return res.json({
		service: "config",
		endpoints: ["GET /public"],
	});
});

export default router;
