import type { Request, Response } from "express";
import { BookmarkService } from "../services/bookmark.service.js";

export const BookmarkController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const bookmarks = await BookmarkService.getAll(query);
			res.json(bookmarks || []);
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;

			if (!id)
				return res.status(400).json({ message: "Yêu cầu Bookmark ID" });

			const bookmark = await BookmarkService.getById(id);

			if (!bookmark)
				return res.status(404).json({ message: "Không thấy bookmark" });

			res.json(bookmark);
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getByUser(req: Request, res: Response) {
		try {
			const { userId } = (req as any).validatedParams;

			const bookmarks = await BookmarkService.getByUser(userId);

			res.json(bookmarks || []);
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getByLesson(req: Request, res: Response) {
		try {
			const { lessonId } = (req as any).validatedParams;

			const bookmarks = await BookmarkService.getByLesson(lessonId);

			res.json(bookmarks || []);
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;

			const id = await BookmarkService.create(body);

			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const body = (req as any).validatedBody;

			await BookmarkService.update(id, body);

			res.json({ message: "Bookmark updated" });
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;

			await BookmarkService.delete(id);

			res.json({ message: "Bookmark deleted" });
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async deleteByUserLesson(req: Request, res: Response) {
		try {
			const { user_id, lesson_id } = (req as any).validatedBody;

			await BookmarkService.deleteByUserLesson(user_id, lesson_id);

			res.json({ message: "Bookmark deleted" });
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},
};
