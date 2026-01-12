import type { Notification } from "../@types/notification.js";
import { NotificationModel } from "../models/notification.model.js";

export const NotificationService = {
	/* ===== EXISTING ===== */

	getByUser: (user_id: string, query?: any) =>
		NotificationModel.getByUser(user_id, query),

	getById: (id: number) =>
		NotificationModel.getById(id),

	getAll: () =>
		NotificationModel.getAll(),

	create: (data: Partial<Notification>) =>
		NotificationModel.create(data),

	markAsRead: (id: number) =>
		NotificationModel.markAsRead(id),

	delete: (id: number) =>
		NotificationModel.delete(id),

	countUnread: (user_id: string) =>
		NotificationModel.countUnread(user_id),

	/* ===== NEW ===== */

	markAllAsRead: (user_id: string) =>
		NotificationModel.markAllAsRead(user_id),

	getUnreadByUser: (user_id: string) =>
		NotificationModel.getUnreadByUser(user_id),

	bulkMarkAsRead: (ids: number[]) =>
		NotificationModel.bulkMarkAsRead(ids),

	deleteAllByUser: (user_id: string) =>
		NotificationModel.deleteAllByUser(user_id),
};
