import { PaymentModel } from "../payment/model.js";
export const PaymentService = {
    getAll: () => PaymentModel.getAll(),
    getById: (id) => PaymentModel.getById(id),
    getByOrder: (order_id) => PaymentModel.getByOrder(order_id),
    create: (data) => PaymentModel.create(data),
    update: (id, data) => PaymentModel.update(id, data),
    delete: (id) => PaymentModel.delete(id),
    count: () => PaymentModel.count(),
};
