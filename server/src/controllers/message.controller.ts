import { Request, Response } from "express";
import { MessageService } from "../services/message.service.js";

export class MessageController {
	static async create(req: Request, res: Response) {
		const body = (req as any).validatedBody ?? req.body;
		const id = await MessageService.create(body);
		res.status(201).json({ id });
	}

	static async getByStudyDate(req: Request, res: Response) {
		const { study_date_id } = (req as any).validatedParams;
		const data = await MessageService.getByStudyDate(Number(study_date_id));
		res.json(data);
	}

	static async getAll(req: Request, res: Response) {
		const data = await MessageService.getAll();
		res.json(data);
	}

	static async delete(req: Request, res: Response) {
		const { id } = (req as any).validatedParams;
		await MessageService.delete(Number(id));
		res.json({ message: "Đã xoá tin nhắn." });
	}
}
