import type { Request, Response } from "express";
import { NotificationService } from "../services/notification.service.js";

export const NotificationController = {
	async getByUser(req: Request, res: Response) {
		try {
			const { user_id } = (req as any).validatedParams;
			if (!user_id)
				return res.status(400).json({ message: "Yêu cầu User ID" });

			const notifications = await NotificationService.getByUser(String(user_id));
			res.json(notifications || []);
		} catch (err) {
			console.error("getByUser error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Notification ID" });

			const notification = await NotificationService.getById(Number(id));
			if (!notification)
				return res.status(404).json({ message: "Không thấy notification" });

			res.json(notification);
		} catch (err) {
			console.error("getById error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async getAll(req: Request, res: Response) {
		try {
			const notifications = await NotificationService.getAll();
			res.json(notifications || []);
		} catch (err) {
			console.error("getAll error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await NotificationService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async markAsRead(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Notification ID" });

			await NotificationService.markAsRead(Number(id));
			res.json({ message: "Notification marked as read" });
		} catch (err) {
			console.error("markAsRead error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Notification ID" });

			await NotificationService.delete(Number(id));
			res.json({ message: "Notification deleted" });
		} catch (err) {
			console.error("delete error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async countUnread(req: Request, res: Response) {
		try {
			const { user_id } = (req as any).validatedParams;
			if (!user_id)
				return res.status(400).json({ message: "Yêu cầu User ID" });

			const total = await NotificationService.countUnread(String(user_id));
			res.json({ total });
		} catch (err) {
			console.error("countUnread error:", err);
			res.status(500).json({ message: "Server error", error: err });
		}
	},
};
