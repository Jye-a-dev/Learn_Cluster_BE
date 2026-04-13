import type { Plan } from "../plan/types.js";
import { PlanModel } from "../plan/model.js";

export const PlanService = {
	getAll: () => PlanModel.getAll(),

	getById: (id: string) => PlanModel.getById(id),

	create: (plan: Partial<Plan>) => PlanModel.create(plan),

	update: (id: string, data: Partial<Plan>) => PlanModel.update(id, data),

	delete: (id: string) => PlanModel.delete(id),

	count: () => PlanModel.count(),
};
