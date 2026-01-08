import Joi from "joi";

// ===== CREATE PERMISSION =====
export const createPermissionSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().optional().allow(null, ""),
});

// ===== UPDATE PERMISSION =====
export const updatePermissionSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  description: Joi.string().optional().allow(null, ""),
}).min(1);

// ===== GET / DELETE BY ID =====
export const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});
