// src/routes/bookmark.routes.ts
import { Router } from "express";
import { BookmarkController } from "../controllers/bookmark.controller.js";
import {
	createBookmarkSchema,
	bookmarkIdParamSchema,
	queryBookmarksSchema,
} from "../validators/bookmark.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryBookmarksSchema), BookmarkController.getAll);
router.get("/:id", validateParams(bookmarkIdParamSchema), BookmarkController.getById);

router.post("/", validateBody(createBookmarkSchema), BookmarkController.create);
router.delete("/:id", validateParams(bookmarkIdParamSchema), BookmarkController.delete);

export default router;
