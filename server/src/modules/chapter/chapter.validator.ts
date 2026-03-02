import Joi from "joi";

const uuid = Joi.string().guid({
  version: ["uuidv1", "uuidv4", "uuidv5"],
});

// ===== CREATE CHAPTER =====
export const createChapterSchema = Joi.object({
  course_id: uuid.required(),
  title: Joi.string().max(255).required(),
  ordering: Joi.number().integer().min(1).required(),
});

// ===== UPDATE CHAPTER =====
export const updateChapterSchema = Joi.object({
  course_id: uuid.optional(),
  title: Joi.string().max(255).optional(),
  ordering: Joi.number().integer().min(1).optional(),
}).min(1);

// ===== GET / DELETE BY ID =====
export const idParamSchema = Joi.object({
  id: uuid.required(),
});

// ===== GET CHAPTERS BY COURSE =====
export const courseIdParamSchema = Joi.object({
  course_id: uuid.required(),
});

// ===== PAGINATION / QUERY =====
export const queryChaptersSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  course_id: uuid.optional(),
});
