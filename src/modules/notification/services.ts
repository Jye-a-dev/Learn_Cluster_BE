import { NotificationModel } from "../notification/model.js";

type CreateNotificationInput = {
  sender_id: string | null;
  user_id: string;
  type?: string | null;
  reference_id?: string | null;
  reference_type?: string | null;
  content?: string | null;
};

export const NotificationService = {
  getByUser: (user_id: string, query?: any) =>
    NotificationModel.getByUser(user_id, query),

  getById: (id: string) =>
    NotificationModel.getById(id),

  getAll: () =>
    NotificationModel.getAll(),

  async create(data: CreateNotificationInput) {
    // Có thể thêm business rule tại đây
    return NotificationModel.create(data);
  },

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