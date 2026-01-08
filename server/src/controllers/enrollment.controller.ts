import type { Request, Response } from "express";
import { EnrollmentService } from "../services/enrollment.service.js";

export const EnrollmentController = {
	async getAll(req: Request, res: Response) {
		try {
			const enrollments = await EnrollmentService.getAll();
			res.json(enrollments || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Enrollment ID" });

			const enrollment = await EnrollmentService.getById(id);
			if (!enrollment) return res.status(404).json({ message: "Không thấy enrollment" });

			res.json(enrollment);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await EnrollmentService.count();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await EnrollmentService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			const body = (req as any).validatedBody;
			if (!id) return res.status(400).json({ message: "Yêu cầu Enrollment ID" });

			await EnrollmentService.update(id, body);
			res.json({ message: "Enrollment updated" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Enrollment ID" });

			await EnrollmentService.delete(id);
			res.json({ message: "Enrollment deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
	async getFiltered(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery; // { user_id?, course_id?, page?, limit? }
			const enrollments = await EnrollmentService.getFiltered(query);
			res.json(enrollments || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
};
