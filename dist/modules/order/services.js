import { OrderModel } from "./model.js";
export const OrderService = {
    getAll: () => OrderModel.getAll(),
    getById: (id) => OrderModel.getById(id),
    getByUser: (user_id) => OrderModel.getByUser(user_id),
    create: (order) => OrderModel.create(order),
    update: (id, data) => OrderModel.update(id, data),
    delete: (id) => OrderModel.delete(id),
    count: () => OrderModel.count(),
};
