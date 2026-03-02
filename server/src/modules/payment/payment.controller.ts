import type { Request, Response } from "express";
import { PaymentService } from "../payment/payment.service.js";

export const PaymentController = {
	async getAll(req: Request, res: Response) {
		try {
			const data = await PaymentService.getAll();
			res.json(data || []);
		} catch (err) {
			console.error("getAll payments error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const payment = await PaymentService.getById(id);

			if (!payment)
				return res.status(404).json({ message: "Không thấy payment" });

			res.json(payment);
		} catch (err) {
			console.error("getById payment error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getByOrder(req: Request, res: Response) {
		const { order_id } = (req as any).validatedParams;
		const payments = await PaymentService.getByOrder(order_id);
		res.json(payments);
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await PaymentService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create payment error:", err);
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

			await PaymentService.update(id, body);
			res.json({ message: "Payment updated" });
		} catch (err) {
			console.error("update payment error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			await PaymentService.delete(id);
			res.json({ message: "Payment deleted" });
		} catch (err) {
			console.error("delete payment error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async count(req: Request, res: Response) {
		const total = await PaymentService.count();
		res.json({ total });
	},
};