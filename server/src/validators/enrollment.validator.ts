import Joi from "joi";

// ===== CREATE ENROLLMENT =====
export const createEnrollmentSchema = Joi.object({
  user_id: Joi.string().guid({ version: ["uuidv1","uuidv4", "uuidv5"] }).required(),
  course_id: Joi.string().guid({ version: ["uuidv1","uuidv4", "uuidv5"] }).required(),
});

// ===== UPDATE ENROLLMENT =====
export const updateEnrollmentSchema = Joi.object({
  user_id: Joi.string().guid({ version: ["uuidv1","uuidv4", "uuidv5"] }).optional(),
  course_id: Joi.string().guid({ version: ["uuidv1","uuidv4", "uuidv5"] }).optional(),
}).min(1);

// ===== GET / DELETE BY ID =====
export const idParamSchema = Joi.object({
  id: Joi.string().guid({ version: ["uuidv1","uuidv4", "uuidv5"] }).required(),
});

// ===== QUERY ENROLLMENTS =====
export const queryEnrollmentsSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  user_id: Joi.string().guid({ version: ["uuidv1","uuidv4", "uuidv5"] }).optional(),
  course_id: Joi.string().guid({ version: ["uuidv1","uuidv4", "uuidv5"] }).optional(),
});
