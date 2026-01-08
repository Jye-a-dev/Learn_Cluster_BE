import Joi from "joi";

// ===== CREATE GRADE =====
export const createGradeSchema = Joi.object({
  submission_id: Joi.number().integer().required(),
  grader_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).optional().allow(null),
  score: Joi.number().precision(2).optional().allow(null),
  feedback: Joi.string().optional().allow(null, ""),
});

// ===== UPDATE GRADE =====
export const updateGradeSchema = Joi.object({
  submission_id: Joi.number().integer().optional(),
  grader_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).optional().allow(null),
  score: Joi.number().precision(2).optional().allow(null),
  feedback: Joi.string().optional().allow(null, ""),
}).min(1);

// ===== GET / DELETE GRADE BY ID =====
export const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});

// ===== GET GRADES BY SUBMISSION =====
export const submissionIdParamSchema = Joi.object({
  submission_id: Joi.number().integer().required(),
});

// ===== GET GRADES BY GRADER =====
export const graderIdParamSchema = Joi.object({
  grader_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).required(),
});

// ===== PATCH FEEDBACK ONLY =====
export const updateFeedbackSchema = Joi.object({
  feedback: Joi.string().optional().allow(null, ""),
}).required();
