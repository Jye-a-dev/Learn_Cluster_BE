import { PlanService } from "../plan/services.js";
export const PlanController = {
    async getAll(req, res) {
        try {
            const plans = await PlanService.getAll();
            res.json(plans || []);
        }
        catch (err) {
            console.error("getAll plans error:", err);
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
                return res.status(400).json({ message: "Yêu cầu Plan ID" });
            const plan = await PlanService.getById(id);
            if (!plan)
                return res.status(404).json({ message: "Không thấy plan" });
            res.json(plan);
        }
        catch (err) {
            console.error("getById plan error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await PlanService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            console.error("create plan error:", err);
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
            await PlanService.update(id, body);
            res.json({ message: "Plan updated" });
        }
        catch (err) {
            console.error("update plan error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            await PlanService.delete(id);
            res.json({ message: "Plan deleted" });
        }
        catch (err) {
            console.error("delete plan error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async count(req, res) {
        const total = await PlanService.count();
        res.json({ total });
    },
};
