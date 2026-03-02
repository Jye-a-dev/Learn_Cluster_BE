import Joi from "joi";

const uuid = Joi.string().guid();
// ===== CREATE LESSON =====
export const createLessonSchema = Joi.object({
  chapter_id: uuid.required(),
  title: Joi.string().max(255).required(),
  content_type: Joi.string().valid("video", "pdf", "text").required(),

  content_url: Joi.alternatives().conditional("content_type", {
    is: "text",
    then: Joi.valid(null, ""),
    otherwise: Joi.string().uri().required(),
  }),

  content_text: Joi.alternatives().conditional("content_type", {
    is: "text",
    then: Joi.string().min(1).required(),
    otherwise: Joi.valid(null, ""),
  }),

  ordering: Joi.number().integer().min(1).required(),
});



// ===== UPDATE LESSON =====
export const updateLessonSchema = Joi.object({
  chapter_id: uuid.optional(),
  title: Joi.string().max(255).optional(),
  content_type: Joi.string().valid("video", "pdf", "text").optional(),

  content_url: Joi.string().uri().optional().allow(null, ""),
  content_text: Joi.string().optional().allow(null, ""),

  ordering: Joi.number().integer().min(1).optional(),
}).min(1);

// ===== ID PARAM =====
export const idParamSchema = Joi.object({
  id: uuid.required(),
});

// ===== CHAPTER PARAM =====
export const chapterIdParamSchema = Joi.object({
  chapter_id: uuid.required(),
});

// ===== ORDER PATCH =====
export const updateOrderSchema = Joi.object({
  ordering: Joi.number().integer().min(1).required(),
});
