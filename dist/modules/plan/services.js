import { PlanModel } from "../plan/model.js";
export const PlanService = {
    getAll: () => PlanModel.getAll(),
    getById: (id) => PlanModel.getById(id),
    create: (plan) => PlanModel.create(plan),
    update: (id, data) => PlanModel.update(id, data),
    delete: (id) => PlanModel.delete(id),
    count: () => PlanModel.count(),
};
