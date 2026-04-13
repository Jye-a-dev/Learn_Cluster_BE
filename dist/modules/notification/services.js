import { NotificationModel } from "../notification/model.js";
export const NotificationService = {
    getByUser: (user_id, query) => NotificationModel.getByUser(user_id, query),
    getById: (id) => NotificationModel.getById(id),
    getAll: () => NotificationModel.getAll(),
    async create(data) {
        // Có thể thêm business rule tại đây
        return NotificationModel.create(data);
    },
    markAsRead: (id) => NotificationModel.markAsRead(id),
    delete: (id) => NotificationModel.delete(id),
    countUnread: (user_id) => NotificationModel.countUnread(user_id),
    markAllAsRead: (user_id) => NotificationModel.markAllAsRead(user_id),
    getUnreadByUser: (user_id) => NotificationModel.getUnreadByUser(user_id),
    bulkMarkAsRead: (ids) => NotificationModel.bulkMarkAsRead(ids),
    deleteAllByUser: (user_id) => NotificationModel.deleteAllByUser(user_id),
};
