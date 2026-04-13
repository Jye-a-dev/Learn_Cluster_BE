import type { OrderItem } from "../orderItem/types.js";
import { OrderItemModel } from "../orderItem/model.js";

export const OrderItemService = {
	getAll: () => OrderItemModel.getAll(),

	getById: (id: string) => OrderItemModel.getById(id),

	getByOrder: (order_id: string) =>
		OrderItemModel.getByOrder(order_id),

	create: (item: Partial<OrderItem>) =>
		OrderItemModel.create(item),

	update: (id: string, data: Partial<OrderItem>) =>
		OrderItemModel.update(id, data),

	delete: (id: string) => OrderItemModel.delete(id),

	count: () => OrderItemModel.count(),
};