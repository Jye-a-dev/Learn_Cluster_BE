import type { Request, Response } from "express";
import { AssignmentService } from "../services/assignment.service.js";

export const AssignmentController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const assignments = await AssignmentService.getAll(query);
			res.json(assignments || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Assignment ID" });

			const assignment = await AssignmentService.getById(id);
			if (!assignment) return res.status(404).json({ message: "Không thấy assignment" });

			res.json(assignment);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getByCourse(req: Request, res: Response) {
		try {
			const { courseId } = (req as any).validatedParams;
			if (!courseId) return res.status(400).json({ message: "Yêu cầu Course ID" });

			const assignments = await AssignmentService.getByCourse(courseId);
			res.json(assignments || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await AssignmentService.count();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await AssignmentService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const body = (req as any).validatedBody;
			if (!id) return res.status(400).json({ message: "Yêu cầu Assignment ID" });

			await AssignmentService.update(id, body);
			res.json({ message: "Assignment updated" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Assignment ID" });

			await AssignmentService.delete(id);
			res.json({ message: "Assignment deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async deleteByCourse(req: Request, res: Response) {
		try {
			const { courseId } = (req as any).validatedParams;
			if (!courseId) return res.status(400).json({ message: "Yêu cầu Course ID" });

			await AssignmentService.deleteByCourse(courseId);
			res.json({ message: "Assignments deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};
