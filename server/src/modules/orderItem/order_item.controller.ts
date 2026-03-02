import type { Request, Response } from "express";
import { OrderItemService } from "../orderItem/order_item.service.js";

export const OrderItemController = {
	async getAll(req: Request, res: Response) {
		try {
			const items = await OrderItemService.getAll();
			res.json(items || []);
		} catch (err) {
			console.error("getAll order_items error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const item = await OrderItemService.getById(id);
			if (!item)
				return res.status(404).json({ message: "Không thấy order_item" });

			res.json(item);
		} catch (err) {
			console.error("getById order_item error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await OrderItemService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create order_item error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const body = (req as any).validatedBody;

			await OrderItemService.update(id, body);
			res.json({ message: "OrderItem updated" });
		} catch (err) {
			console.error("update order_item error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;

			await OrderItemService.delete(id);
			res.json({ message: "OrderItem deleted" });
		} catch (err) {
			console.error("delete order_item error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getByOrder(req: Request, res: Response) {
		const { order_id } = (req as any).validatedParams;
		const items = await OrderItemService.getByOrder(order_id);
		res.json(items);
	},

	async count(req: Request, res: Response) {
		const total = await OrderItemService.count();
		res.json({ total });
	},
};