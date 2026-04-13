import Joi from "joi";
const uuidSchema = Joi.string().guid({
    version: ["uuidv1", "uuidv4", "uuidv5"],
});
/* ===================== CREATE ===================== */
export const createPlanSchema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().allow("").optional(),
    price: Joi.number().precision(2).min(0).required(),
    duration_days: Joi.number().integer().min(1).allow(null).optional(),
    is_active: Joi.boolean().optional(),
});
/* ===================== UPDATE ===================== */
export const updatePlanSchema = Joi.object({
    name: Joi.string().max(100).optional(),
    description: Joi.string().allow("").optional(),
    price: Joi.number().precision(2).min(0).optional(),
    duration_days: Joi.number().integer().min(1).allow(null).optional(),
    is_active: Joi.boolean().optional(),
}).min(1);
/* ===================== PARAM ID ===================== */
export const planIdParamSchema = Joi.object({
    id: uuidSchema.required(),
});
