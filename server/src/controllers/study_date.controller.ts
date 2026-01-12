import type { Request, Response } from "express";
import { StudyDateService } from "../services/study_date.service.js";

export const StudyDateController = {
	async getFullById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu StudyDate ID" });

			const studyDate = await StudyDateService.getFullById(Number(id));
			if (!studyDate) return res.status(404).json({ message: "Không thấy study date" });

			res.json(studyDate);
		} catch (err) {
			console.error("getFullById error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const studyDates = await StudyDateService.query(query);
			res.json(studyDates || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu StudyDate ID" });

			const studyDate = await StudyDateService.getById(Number(id));
			if (!studyDate) return res.status(404).json({ message: "Không thấy study date" });

			res.json(studyDate);
		} catch (err) {
			console.error("getById error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getByCourse(req: Request, res: Response) {
		try {
			const { course_id } = (req as any).validatedParams;
			if (!course_id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			const studyDates = await StudyDateService.getByCourse(Number(course_id));
			res.json(studyDates || []);
		} catch (err) {
			console.error("getByCourse error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},
	async getUpcoming(req: Request, res: Response) {
		try {
			const data = await StudyDateService.getUpcoming();
			res.json(data || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},
	async updateLessons(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const { lesson_ids } = (req as any).validatedBody;
			await StudyDateService.updateLessons(Number(id), lesson_ids);
			res.json({ message: "Lessons updated" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await StudyDateService.count();
			res.json({ total });
		} catch (err) {
			console.error("count error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await StudyDateService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const body = (req as any).validatedBody;
			if (!id) return res.status(400).json({ message: "Yêu cầu StudyDate ID" });

			await StudyDateService.update(Number(id), body);
			res.json({ message: "Study date updated" });
		} catch (err) {
			console.error("update error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu StudyDate ID" });

			await StudyDateService.delete(Number(id));
			res.json({ message: "Study date deleted" });
		} catch (err) {
			console.error("delete error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};
