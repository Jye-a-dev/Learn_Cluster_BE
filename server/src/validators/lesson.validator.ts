import Joi from "joi";

// ===== CREATE LESSON =====
export const createLessonSchema = Joi.object({
  chapter_id: Joi.number().integer().required(),
  title: Joi.string().max(255).required(),
  content_type: Joi.string().valid("video", "pdf", "text").required(),
  content_url: Joi.string().optional().allow(null, ""),
  ordering: Joi.number().integer().required(),
});

// ===== UPDATE LESSON =====
export const updateLessonSchema = Joi.object({
  chapter_id: Joi.number().integer().optional(),
  title: Joi.string().max(255).optional(),
  content_type: Joi.string().valid("video", "pdf", "text").optional(),
  content_url: Joi.string().optional().allow(null, ""),
  ordering: Joi.number().integer().optional(),
}).min(1);

// ===== GET / DELETE BY ID =====
export const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});
