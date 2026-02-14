import type { Notification } from "../@types/notification.js";
import { NotificationModel } from "../models/notification.model.js";

export const NotificationService = {
  getByUser: (user_id: string, query?: any) =>
    NotificationModel.getByUser(user_id, query),

  getById: (id: string) =>
    NotificationModel.getById(id),

  getAll: () =>
    NotificationModel.getAll(),

  create: (data: Partial<Notification>) =>
    NotificationModel.create(data),

  markAsRead: (id: string) =>
    NotificationModel.markAsRead(id),

  delete: (id: string) =>
    NotificationModel.delete(id),

  countUnread: (user_id: string) =>
    NotificationModel.countUnread(user_id),

  markAllAsRead: (user_id: string) =>
    NotificationModel.markAllAsRead(user_id),

  getUnreadByUser: (user_id: string) =>
    NotificationModel.getUnreadByUser(user_id),

  bulkMarkAsRead: (ids: string[]) =>
    NotificationModel.bulkMarkAsRead(ids),

  deleteAllByUser: (user_id: string) =>
    NotificationModel.deleteAllByUser(user_id),
};
