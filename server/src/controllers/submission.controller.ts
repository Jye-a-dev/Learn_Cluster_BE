import type { Request, Response } from "express";
import { SubmissionService } from "../services/submission.service.js";

export const SubmissionController = {
	async getAll(req: Request, res: Response) {
		try {
			const submissions = await SubmissionService.getAll();
			res.json(submissions || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Submission ID" });

			const submission = await SubmissionService.getById(id);
			if (!submission) return res.status(404).json({ message: "Không thấy submission" });

			res.json(submission);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await SubmissionService.count();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await SubmissionService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			const body = (req as any).validatedBody;
			if (!id) return res.status(400).json({ message: "Yêu cầu Submission ID" });

			await SubmissionService.update(id, body);
			res.json({ message: "Submission updated" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Submission ID" });

			await SubmissionService.delete(id);
			res.json({ message: "Submission deleted" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
	async getByAssignment(req: Request, res: Response) {
		try {
			const { assignment_id } = (req as any).validatedParams;
			const data = await SubmissionService.getByAssignment(assignment_id);
			res.json(data || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async countByAssignment(req: Request, res: Response) {
		try {
			const { assignment_id } = (req as any).validatedParams;
			const total = await SubmissionService.countByAssignment(assignment_id);
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getByStudent(req: Request, res: Response) {
		try {
			const { student_id } = (req as any).validatedParams;
			const data = await SubmissionService.getByStudent(student_id);
			res.json(data || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async countByStudent(req: Request, res: Response) {
		try {
			const { student_id } = (req as any).validatedParams;
			const total = await SubmissionService.countByStudent(student_id);
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async checkSubmitted(req: Request, res: Response) {
		try {
			const { assignment_id, student_id } = (req as any).validatedParams;
			const submission = await SubmissionService.getByAssignmentAndStudent(assignment_id, student_id);
			res.json({ submitted: !!submission, submission });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};
