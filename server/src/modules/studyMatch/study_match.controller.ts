import type { Request, Response } from "express";
import { StudyMatchService } from "./study_match.service.js";

export const StudyMatchController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const matches = await StudyMatchService.getAll(query);
			res.json(matches || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Match ID" });

			const match = await StudyMatchService.getById(id);
			if (!match)
				return res.status(404).json({ message: "Không thấy match" });

			res.json(match);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await StudyMatchService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Match ID" });

			await StudyMatchService.delete(id);
			res.json({ message: "Match deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await StudyMatchService.count();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};