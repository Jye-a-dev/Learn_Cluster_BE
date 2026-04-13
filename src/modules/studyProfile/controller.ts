import type { Request, Response } from "express";
import { StudyProfileService } from "./services.js";

export const StudyProfileController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const profiles = await StudyProfileService.getAll(query);
			res.json(profiles || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu StudyProfile ID" });

			const profile = await StudyProfileService.getById(id);
			if (!profile)
				return res.status(404).json({ message: "Không thấy study profile" });

			res.json(profile);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getByUser(req: Request, res: Response) {
		try {
			const { userId } = (req as any).validatedParams;
			if (!userId)
				return res.status(400).json({ message: "Yêu cầu User ID" });

			const profile = await StudyProfileService.getByUserId(userId);
			if (!profile)
				return res.status(404).json({ message: "Không thấy study profile" });

			res.json(profile);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await StudyProfileService.create(body);
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
				return res.status(400).json({ message: "Yêu cầu StudyProfile ID" });

			await StudyProfileService.update(id, body);
			res.json({ message: "StudyProfile updated" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu StudyProfile ID" });

			await StudyProfileService.delete(id);
			res.json({ message: "StudyProfile deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await StudyProfileService.count();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};