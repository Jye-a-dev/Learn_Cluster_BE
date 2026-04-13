import { OrderItemService } from "../orderItem/services.js";
export const OrderItemController = {
    async getAll(req, res) {
        try {
            const items = await OrderItemService.getAll();
            res.json(items || []);
        }
        catch (err) {
            console.error("getAll order_items error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            const item = await OrderItemService.getById(id);
            if (!item)
                return res.status(404).json({ message: "Không thấy order_item" });
            res.json(item);
        }
        catch (err) {
            console.error("getById order_item error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await OrderItemService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            console.error("create order_item error:", err);
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
            await OrderItemService.update(id, body);
            res.json({ message: "OrderItem updated" });
        }
        catch (err) {
            console.error("update order_item error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            await OrderItemService.delete(id);
            res.json({ message: "OrderItem deleted" });
        }
        catch (err) {
            console.error("delete order_item error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async getByOrder(req, res) {
        const { order_id } = req.validatedParams;
        const items = await OrderItemService.getByOrder(order_id);
        res.json(items);
    },
    async count(req, res) {
        const total = await OrderItemService.count();
        res.json({ total });
    },
};
