import Joi from "joi";
const uuidSchema = Joi.string().guid({
    version: ["uuidv1", "uuidv4", "uuidv5"],
});
const itemTypeEnum = ["course", "plan"];
/* ===================== CREATE ===================== */
export const createOrderItemSchema = Joi.object({
    order_id: uuidSchema.required(),
    item_type: Joi.string().valid(...itemTypeEnum).required(),
    item_id: uuidSchema.required(),
    price: Joi.number().precision(2).min(0).required(),
});
/* ===================== UPDATE ===================== */
export const updateOrderItemSchema = Joi.object({
    item_type: Joi.string().valid(...itemTypeEnum).optional(),
    item_id: uuidSchema.optional(),
    price: Joi.number().precision(2).min(0).optional(),
}).min(1);
/* ===================== PARAM ID ===================== */
export const orderItemIdParamSchema = Joi.object({
    id: uuidSchema.required(),
});
/* ===================== PARAM ORDER ID ===================== */
export const orderItemOrderIdParamSchema = Joi.object({
    order_id: uuidSchema.required(),
});
