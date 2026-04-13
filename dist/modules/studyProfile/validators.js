import Joi from "joi";
export const createStudyProfileSchema = Joi.object({
    user_id: Joi.string().uuid().required(),
    bio: Joi.string().optional().allow(null, ""),
    preferred_subject: Joi.string().optional().allow(null, ""),
    level: Joi.string()
        .valid("Beginner", "Intermediate", "Advanced")
        .optional()
        .allow(null),
    learning_goal: Joi.string().optional().allow(null, ""),
    available_time: Joi.object().optional().allow(null),
    is_active: Joi.boolean().optional(),
});
export const updateStudyProfileSchema = Joi.object({
    user_id: Joi.string().uuid().optional(),
    bio: Joi.string().optional().allow(null, ""),
    preferred_subject: Joi.string().optional().allow(null, ""),
    level: Joi.string()
        .valid("Beginner", "Intermediate", "Advanced")
        .optional()
        .allow(null),
    learning_goal: Joi.string().optional().allow(null, ""),
    available_time: Joi.object().optional().allow(null),
    is_active: Joi.boolean().optional(),
}).min(1);
export const studyProfileIdParamSchema = Joi.object({
    id: Joi.string().uuid().required(),
});
export const userIdParamSchema = Joi.object({
    userId: Joi.string().uuid().required(),
});
export const queryStudyProfileSchema = Joi.object({
    user_id: Joi.string().uuid().optional(),
    level: Joi.string().valid("Beginner", "Intermediate", "Advanced").optional(),
    is_active: Joi.boolean().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
});
