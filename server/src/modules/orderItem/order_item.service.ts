import type { OrderItem } from "../orderItem/order_item.js";
import { OrderItemModel } from "../orderItem/order_item.model.js";

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