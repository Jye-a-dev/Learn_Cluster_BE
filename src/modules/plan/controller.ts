import type { Request, Response } from "express";
import { PlanService } from "../plan/services.js";

export const PlanController = {
	async getAll(req: Request, res: Response) {
		try {
			const plans = await PlanService.getAll();
			res.json(plans || []);
		} catch (err) {
			console.error("getAll plans error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Plan ID" });

			const plan = await PlanService.getById(id);
			if (!plan)
				return res.status(404).json({ message: "Không thấy plan" });

			res.json(plan);
		} catch (err) {
			console.error("getById plan error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await PlanService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create plan error:", err);
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

			await PlanService.update(id, body);
			res.json({ message: "Plan updated" });
		} catch (err) {
			console.error("update plan error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;

			await PlanService.delete(id);
			res.json({ message: "Plan deleted" });
		} catch (err) {
			console.error("delete plan error:", err);
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async count(req: Request, res: Response) {
		const total = await PlanService.count();
		res.json({ total });
	},
};