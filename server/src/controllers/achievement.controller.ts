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
			res.status(500).json({ message: "Server error", error: err });
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
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getByUser(req: Request, res: Response) {
		try {
			const { userId } = (req as any).validatedParams;
			if (!userId) return res.status(400).json({ message: "Yêu cầu User ID" });

			const achievements = await AchievementService.getByUser(userId);
			res.json(achievements || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await AchievementService.count();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await AchievementService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async bulkCreate(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			await AchievementService.bulkCreate(body);
			res.status(201).json({ message: "Achievements created" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
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
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Achievement ID" });

			await AchievementService.delete(Number(id));
			res.json({ message: "Achievement deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async deleteByUser(req: Request, res: Response) {
		try {
			const { userId } = (req as any).validatedParams;
			if (!userId) return res.status(400).json({ message: "Yêu cầu User ID" });

			await AchievementService.deleteByUser(userId);
			res.json({ message: "Achievements deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};
