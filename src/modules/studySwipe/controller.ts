import type { Request, Response } from "express";
import { StudySwipeService } from "./services.js";

export const StudySwipeController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const swipes = await StudySwipeService.getAll(query);
			res.json(swipes || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Swipe ID" });

			const swipe = await StudySwipeService.getById(id);
			if (!swipe)
				return res.status(404).json({ message: "Không thấy swipe" });

			res.json(swipe);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await StudySwipeService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const body = (req as any).validatedBody;

			if (!id)
				return res.status(400).json({ message: "Yêu cầu Swipe ID" });

			await StudySwipeService.update(id, body);
			res.json({ message: "Swipe updated" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Swipe ID" });

			await StudySwipeService.delete(id);
			res.json({ message: "Swipe deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await StudySwipeService.count();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};