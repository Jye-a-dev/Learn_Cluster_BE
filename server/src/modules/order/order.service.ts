import type { Order } from "../order/order.js";
import { OrderModel } from "./order.model.js";

export const OrderService = {
	getAll: () => OrderModel.getAll(),

	getById: (id: string) => OrderModel.getById(id),

	getByUser: (user_id: string) =>
		OrderModel.getByUser(user_id),

	create: (order: Partial<Order>) =>
		OrderModel.create(order),

	update: (id: string, data: Partial<Order>) =>
		OrderModel.update(id, data),

	delete: (id: string) => OrderModel.delete(id),

	count: () => OrderModel.count(),
};