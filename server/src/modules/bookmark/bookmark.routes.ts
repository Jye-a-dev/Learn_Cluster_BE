import { Router } from "express";
import { BookmarkController } from "../bookmark/bookmark.controller.js";
import {
	createBookmarkSchema,
	bookmarkIdParamSchema,
	queryBookmarksSchema,
	updateBookmarkSchema,
	userIdParamSchema,
	lessonIdParamSchema,
	deleteBookmarkByUserLessonSchema,
} from "../bookmark/bookmark.validator.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryBookmarksSchema), BookmarkController.getAll);
router.get("/id/:id", validateParams(bookmarkIdParamSchema), BookmarkController.getById);
router.get("/user/:userId", validateParams(userIdParamSchema), BookmarkController.getByUser);
router.get("/lesson/:lessonId", validateParams(lessonIdParamSchema), BookmarkController.getByLesson);

router.post("/", validateBody(createBookmarkSchema), BookmarkController.create);
router.put("/id/:id", validateParams(bookmarkIdParamSchema), validateBody(updateBookmarkSchema), BookmarkController.update);
router.patch("/id/:id", validateParams(bookmarkIdParamSchema), validateBody(updateBookmarkSchema), BookmarkController.update);

router.delete("/id/:id", validateParams(bookmarkIdParamSchema), BookmarkController.delete);
router.delete("/user-lesson", validateBody(deleteBookmarkByUserLessonSchema), BookmarkController.deleteByUserLesson);

export default router;
