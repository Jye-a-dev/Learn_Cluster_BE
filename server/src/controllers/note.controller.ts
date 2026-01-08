// src/controllers/note.controller.ts
import type { Request, Response } from "express";
import { NoteService } from "../services/note.service.js";

export const NoteController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const notes = await NoteService.getAll(query);
			res.json(notes || []);
		} catch (err) {
			console.error("getAll notes error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Note ID" });

			const note = await NoteService.getById(Number(id));
			if (!note) return res.status(404).json({ message: "Không thấy note" });

			res.json(note);
		} catch (err) {
			console.error("getById note error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await NoteService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create note error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const body = (req as any).validatedBody;
			if (!id) return res.status(400).json({ message: "Yêu cầu Note ID" });

			await NoteService.update(Number(id), body);
			res.json({ message: "Note updated" });
		} catch (err) {
			console.error("update note error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Note ID" });

			await NoteService.delete(Number(id));
			res.json({ message: "Note deleted" });
		} catch (err) {
			console.error("delete note error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
};
