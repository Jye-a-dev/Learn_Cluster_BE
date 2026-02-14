import type { Request, Response } from "express";
import { NotificationService } from "../services/notification.service.js";

export const NotificationController = {
  async getByUser(req: Request, res: Response) {
    try {
      const { user_id } = (req as any).validatedParams;
      const query = (req as any).validatedQuery;

      const notifications = await NotificationService.getByUser(
        user_id,
        query
      );

      res.json(notifications || []);
    } catch (err) {
      console.error("getByUser error:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = (req as any).validatedParams;

      const notification = await NotificationService.getById(id);

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

      await NotificationService.markAsRead(id);

      res.json({ message: "Notification marked as read" });
    } catch (err) {
      console.error("markAsRead error:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = (req as any).validatedParams;

      await NotificationService.delete(id);

      res.json({ message: "Notification deleted" });
    } catch (err) {
      console.error("delete error:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async countUnread(req: Request, res: Response) {
    try {
      const { user_id } = (req as any).validatedParams;

      const total = await NotificationService.countUnread(user_id);

      res.json({ total });
    } catch (err) {
      console.error("countUnread error:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async markAllAsRead(req: Request, res: Response) {
    try {
      const { user_id } = (req as any).validatedParams;

      await NotificationService.markAllAsRead(user_id);

      res.json({ message: "All notifications marked as read" });
    } catch (err) {
      console.error("markAllAsRead error:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async getUnreadByUser(req: Request, res: Response) {
    try {
      const { user_id } = (req as any).validatedParams;

      const notifications =
        await NotificationService.getUnreadByUser(user_id);

      res.json(notifications || []);
    } catch (err) {
      console.error("getUnreadByUser error:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async bulkMarkAsRead(req: Request, res: Response) {
    try {
      const { ids } = (req as any).validatedBody;

      await NotificationService.bulkMarkAsRead(ids);

      res.json({ message: "Notifications marked as read" });
    } catch (err) {
      console.error("bulkMarkAsRead error:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async deleteAllByUser(req: Request, res: Response) {
    try {
      const { user_id } = (req as any).validatedParams;

      await NotificationService.deleteAllByUser(user_id);

      res.json({ message: "All notifications deleted" });
    } catch (err) {
      console.error("deleteAllByUser error:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  },
};
