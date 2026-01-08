// src/controllers/bookmark.controller.ts
import type { Request, Response } from "express";
import { BookmarkService } from "../services/bookmark.service.js";

export const BookmarkController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const bookmarks = await BookmarkService.getAll(query);
			res.json(bookmarks || []);
		} catch (err) {
			console.error("getAll bookmarks error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Bookmark ID" });

			const bookmark = await BookmarkService.getById(Number(id));
			if (!bookmark) return res.status(404).json({ message: "Không thấy bookmark" });

			res.json(bookmark);
		} catch (err) {
			console.error("getById bookmark error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await BookmarkService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create bookmark error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Bookmark ID" });

			await BookmarkService.delete(Number(id));
			res.json({ message: "Bookmark deleted" });
		} catch (err) {
			console.error("delete bookmark error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
};
