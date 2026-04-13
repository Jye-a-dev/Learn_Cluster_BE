import { OrderItemModel } from "../orderItem/model.js";
export const OrderItemService = {
    getAll: () => OrderItemModel.getAll(),
    getById: (id) => OrderItemModel.getById(id),
    getByOrder: (order_id) => OrderItemModel.getByOrder(order_id),
    create: (item) => OrderItemModel.create(item),
    update: (id, data) => OrderItemModel.update(id, data),
    delete: (id) => OrderItemModel.delete(id),
    count: () => OrderItemModel.count(),
};
