// src/controllers/achievement.controller.ts
import type { Request, Response } from "express";
import { AchievementService } from "../services/achievement.service.js";

export const AchievementController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const achievements = await AchievementService.getAll(query);
			res.json(achievements || []);
		} catch (err) {
			console.error("getAll achievements error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Achievement ID" });

			const achievement = await AchievementService.getById(Number(id));
			if (!achievement) return res.status(404).json({ message: "Không thấy achievement" });

			res.json(achievement);
		} catch (err) {
			console.error("getById achievement error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await AchievementService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create achievement error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const body = (req as any).validatedBody;
			if (!id) return res.status(400).json({ message: "Yêu cầu Achievement ID" });

			await AchievementService.update(Number(id), body);
			res.json({ message: "Achievement updated" });
		} catch (err) {
			console.error("update achievement error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Achievement ID" });

			await AchievementService.delete(Number(id));
			res.json({ message: "Achievement deleted" });
		} catch (err) {
			console.error("delete achievement error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
};
