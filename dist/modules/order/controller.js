import { OrderService } from "./services.js";
export const OrderController = {
    async getAll(req, res) {
        try {
            const orders = await OrderService.getAll();
            res.json(orders || []);
        }
        catch (err) {
            console.error("getAll orders error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Order ID" });
            const order = await OrderService.getById(id);
            if (!order)
                return res.status(404).json({ message: "Không thấy order" });
            res.json(order);
        }
        catch (err) {
            console.error("getById order error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await OrderService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            console.error("create order error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            const body = req.validatedBody;
            await OrderService.update(id, body);
            res.json({ message: "Order updated" });
        }
        catch (err) {
            console.error("update order error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            await OrderService.delete(id);
            res.json({ message: "Order deleted" });
        }
        catch (err) {
            console.error("delete order error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async getByUser(req, res) {
        const { user_id } = req.validatedParams;
        const orders = await OrderService.getByUser(user_id);
        res.json(orders);
    },
    async count(req, res) {
        const total = await OrderService.count();
        res.json({ total });
    },
};
