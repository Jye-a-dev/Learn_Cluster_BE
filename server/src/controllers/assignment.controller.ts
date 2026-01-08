import type { Request, Response } from "express";
import { AssignmentService } from "../services/assignment.service.js";

export const AssignmentController = {
	async getAll(req: Request, res: Response) {
		try {
			const assignments = await AssignmentService.getAll();
			res.json(assignments || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Assignment ID" });

			const assignment = await AssignmentService.getById(id);
			if (!assignment) return res.status(404).json({ message: "Không thấy assignment" });

			res.json(assignment);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await AssignmentService.count();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await AssignmentService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			const body = (req as any).validatedBody;
			if (!id) return res.status(400).json({ message: "Yêu cầu Assignment ID" });

			await AssignmentService.update(id, body);
			res.json({ message: "Assignment updated" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Assignment ID" });

			await AssignmentService.delete(id);
			res.json({ message: "Assignment deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
};
