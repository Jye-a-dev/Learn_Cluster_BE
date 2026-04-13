import { NotificationService } from "../notification/services.js";
export const NotificationController = {
    async getByUser(req, res) {
        try {
            const { user_id } = req.validatedParams;
            const query = req.validatedQuery;
            const notifications = await NotificationService.getByUser(user_id, query);
            res.json(notifications || []);
        }
        catch (err) {
            console.error("getByUser error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            const notification = await NotificationService.getById(id);
            if (!notification)
                return res.status(404).json({ message: "Không thấy notification" });
            res.json(notification);
        }
        catch (err) {
            console.error("getById error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getAll(req, res) {
        try {
            const notifications = await NotificationService.getAll();
            res.json(notifications || []);
        }
        catch (err) {
            console.error("getAll error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await NotificationService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            console.error("create error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async markAsRead(req, res) {
        try {
            const { id } = req.validatedParams;
            await NotificationService.markAsRead(id);
            res.json({ message: "Notification marked as read" });
        }
        catch (err) {
            console.error("markAsRead error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            await NotificationService.delete(id);
            res.json({ message: "Notification deleted" });
        }
        catch (err) {
            console.error("delete error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async countUnread(req, res) {
        try {
            const { user_id } = req.validatedParams;
            const total = await NotificationService.countUnread(user_id);
            res.json({ total });
        }
        catch (err) {
            console.error("countUnread error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async markAllAsRead(req, res) {
        try {
            const { user_id } = req.validatedParams;
            await NotificationService.markAllAsRead(user_id);
            res.json({ message: "All notifications marked as read" });
        }
        catch (err) {
            console.error("markAllAsRead error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getUnreadByUser(req, res) {
        try {
            const { user_id } = req.validatedParams;
            const notifications = await NotificationService.getUnreadByUser(user_id);
            res.json(notifications || []);
        }
        catch (err) {
            console.error("getUnreadByUser error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async bulkMarkAsRead(req, res) {
        try {
            const { ids } = req.validatedBody;
            await NotificationService.bulkMarkAsRead(ids);
            res.json({ message: "Notifications marked as read" });
        }
        catch (err) {
            console.error("bulkMarkAsRead error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async deleteAllByUser(req, res) {
        try {
            const { user_id } = req.validatedParams;
            await NotificationService.deleteAllByUser(user_id);
            res.json({ message: "All notifications deleted" });
        }
        catch (err) {
            console.error("deleteAllByUser error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
