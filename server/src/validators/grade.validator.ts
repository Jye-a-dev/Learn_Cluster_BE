import Joi from "joi";

// UUID chung (v1, v4, v5)
const uuidSchema = Joi.string().guid({
  version: ["uuidv1", "uuidv4", "uuidv5"],
});

// ===== CREATE GRADE =====
export const createGradeSchema = Joi.object({
  submission_id: uuidSchema.required(),        // ✅ UUID
  grader_id: uuidSchema.optional().allow(null),
  score: Joi.number().precision(2).optional().allow(null),
  feedback: Joi.string().optional().allow(null, ""),
});

// ===== UPDATE GRADE =====
export const updateGradeSchema = Joi.object({
  submission_id: uuidSchema.optional(),         // ✅ UUID
  grader_id: uuidSchema.optional().allow(null),
  score: Joi.number().precision(2).optional().allow(null),
  feedback: Joi.string().optional().allow(null, ""),
}).min(1);

// ===== GET / DELETE GRADE BY ID =====
export const idParamSchema = Joi.object({
  id: uuidSchema.required(),                    // ⚠️ id cũng là UUID
});

// ===== GET GRADES BY SUBMISSION =====
export const submissionIdParamSchema = Joi.object({
  submission_id: uuidSchema.required(),
});

// ===== GET GRADES BY GRADER =====
export const graderIdParamSchema = Joi.object({
  grader_id: uuidSchema.required(),
});

// ===== PATCH FEEDBACK ONLY =====
export const updateFeedbackSchema = Joi.object({
  feedback: Joi.string().optional().allow(null, ""),
}).min(1);
