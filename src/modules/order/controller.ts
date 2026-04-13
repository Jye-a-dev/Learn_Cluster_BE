import type { Request, Response } from "express";
import { OrderService } from "./services.js";

export const OrderController = {
	async getAll(req: Request, res: Response) {
		try {
			const orders = await OrderService.getAll();
			res.json(orders || []);
		} catch (err) {
			console.error("getAll orders error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Order ID" });

			const order = await OrderService.getById(id);
			if (!order)
				return res.status(404).json({ message: "Không thấy order" });

			res.json(order);
		} catch (err) {
			console.error("getById order error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await OrderService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create order error:", err);
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

			await OrderService.update(id, body);
			res.json({ message: "Order updated" });
		} catch (err) {
			console.error("update order error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;

			await OrderService.delete(id);
			res.json({ message: "Order deleted" });
		} catch (err) {
			console.error("delete order error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getByUser(req: Request, res: Response) {
		const { user_id } = (req as any).validatedParams;
		const orders = await OrderService.getByUser(user_id);
		res.json(orders);
	},

	async count(req: Request, res: Response) {
		const total = await OrderService.count();
		res.json({ total });
	},
};