import Joi from "joi";
const uuidSchema = Joi.string().guid({
    version: ["uuidv1", "uuidv4", "uuidv5"],
});
const statusEnum = ["pending", "success", "failed"];
/* ================= CREATE ================= */
export const createPaymentSchema = Joi.object({
    order_id: uuidSchema.required(),
    provider: Joi.string().max(50).optional(),
    transaction_code: Joi.string().max(255).optional(),
    amount: Joi.number().precision(2).min(0).optional(),
    status: Joi.string().valid(...statusEnum).optional(),
    paid_at: Joi.date().optional(),
    raw_response: Joi.object().optional(),
});
/* ================= UPDATE ================= */
export const updatePaymentSchema = Joi.object({
    provider: Joi.string().max(50).optional(),
    transaction_code: Joi.string().max(255).optional(),
    amount: Joi.number().precision(2).min(0).optional(),
    status: Joi.string().valid(...statusEnum).optional(),
    paid_at: Joi.date().optional(),
    raw_response: Joi.object().optional(),
}).min(1);
/* ================= PARAM ================= */
export const paymentIdParamSchema = Joi.object({
    id: uuidSchema.required(),
});
export const paymentOrderIdParamSchema = Joi.object({
    order_id: uuidSchema.required(),
});
