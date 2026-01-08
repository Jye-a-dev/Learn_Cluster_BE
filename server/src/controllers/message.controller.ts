import { Request, Response } from "express";
import { MessageService } from "../services/message.service.js";

export class MessageController {
  static async create(req: Request, res: Response) {
    try {
      const body = (req as any).validatedBody ?? req.body;
      if (!body) return res.status(400).json({ message: "Yêu cầu body" });

      const id = await MessageService.create(body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  }

  static async getByStudyDate(req: Request, res: Response) {
    try {
      const { study_date_id } = (req as any).validatedParams;
      if (!study_date_id) return res.status(400).json({ message: "Yêu cầu study_date_id" });

      const data = await MessageService.getByStudyDate(Number(study_date_id));
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = (req as any).validatedParams;
      if (!id) return res.status(400).json({ message: "Yêu cầu Message ID" });

      const message = await MessageService.getById(Number(id));
      if (!message) return res.status(404).json({ message: "Không tìm thấy tin nhắn" });

      res.json(message);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  }

  static async getBySender(req: Request, res: Response) {
    try {
      const { sender_id } = (req as any).validatedParams;
      if (!sender_id) return res.status(400).json({ message: "Yêu cầu sender_id" });

      const data = await MessageService.getBySender(sender_id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await MessageService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = (req as any).validatedParams;
      if (!id) return res.status(400).json({ message: "Yêu cầu Message ID" });

      await MessageService.delete(Number(id));
      res.json({ message: "Đã xoá tin nhắn." });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  }

  static async count(req: Request, res: Response) {
    try {
      const total = await MessageService.count();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  }

  static async update(req: Request, res: Response) {
	try {
		const { id } = (req as any).validatedParams;
		const body = (req as any).validatedBody;
		if (!id) return res.status(400).json({ message: "Yêu cầu Message ID" });

		await MessageService.update(Number(id), body);
		res.json({ message: "Tin nhắn đã được cập nhật." });
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
	}
}

}
