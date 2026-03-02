import type { Payment } from "../payment/payment.js";
import { PaymentModel } from "../payment/payment.model.js";

export const PaymentService = {
	getAll: () => PaymentModel.getAll(),

	getById: (id: string) => PaymentModel.getById(id),

	getByOrder: (order_id: string) =>
		PaymentModel.getByOrder(order_id),

	create: (data: Partial<Payment>) =>
		PaymentModel.create(data),

	update: (id: string, data: Partial<Payment>) =>
		PaymentModel.update(id, data),

	delete: (id: string) => PaymentModel.delete(id),

	count: () => PaymentModel.count(),
};