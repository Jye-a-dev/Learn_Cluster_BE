import type { Request, Response } from "express";
import { StudyDateParticipantService } from "../services/study_date_participant.service.js";

export const StudyDateParticipantController = {
	async getByStudyDate(req: Request, res: Response) {
		try {
			const { study_date_id } = (req as any).validatedParams;
			if (!study_date_id) return res.status(400).json({ message: "Yêu cầu StudyDate ID" });

			const participants = await StudyDateParticipantService.getByStudyDate(Number(study_date_id));

			res.json(participants || []);
		} catch (err) {
			console.error("getByStudyDate error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async join(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await StudyDateParticipantService.join(body.study_date_id, body.user_id);
			res.status(201).json({ id });
		} catch (err) {
			console.error("join error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async leave(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			await StudyDateParticipantService.leave(body.study_date_id, body.user_id);
			res.json({ message: "Left study date" });
		} catch (err) {
			console.error("leave error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const { study_date_id } = (req as any).validatedParams;
			if (!study_date_id) return res.status(400).json({ message: "Yêu cầu StudyDate ID" });

			const total = await StudyDateParticipantService.countByStudyDate(Number(study_date_id));

			res.json({ total });
		} catch (err) {
			console.error("count error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},
	async getAll(req: Request, res: Response) {
		try {
			const data = await StudyDateParticipantService.getAll();
			res.json(data || []);
		} catch (err) {
			console.error("getAll error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},
	async getByUser(req: Request, res: Response) {
		try {
			const { user_id } = (req as any).validatedParams;
			const data = await StudyDateParticipantService.getByUser(user_id);
			res.json(data || []);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async countByUser(req: Request, res: Response) {
		try {
			const { user_id } = (req as any).validatedParams;
			const total = await StudyDateParticipantService.countByUser(user_id);
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async checkJoined(req: Request, res: Response) {
		try {
			const { study_date_id, user_id } = (req as any).validatedParams;
			const joined = await StudyDateParticipantService.exists(Number(study_date_id), user_id);
			res.json({ joined });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async kick(req: Request, res: Response) {
		try {
			const { study_date_id, user_id } = (req as any).validatedParams;
			await StudyDateParticipantService.removeByStudyDateAndUser(Number(study_date_id), user_id);
			res.json({ message: "Removed participant" });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};
