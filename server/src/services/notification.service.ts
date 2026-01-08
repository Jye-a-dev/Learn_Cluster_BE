import type { Notification } from "../@types/notification.js";
import { NotificationModel } from "../models/notification.model.js";

export const NotificationService = {
	getByUser: (user_id: string) =>
		NotificationModel.getByUser(user_id),

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
};
