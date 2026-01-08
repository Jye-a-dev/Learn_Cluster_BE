// src/validators/role-permission.validator.ts
import Joi from "joi";

// ===== ADD ROLE PERMISSION =====
export const addRolePermissionSchema = Joi.object({
	role_id: Joi.number().integer().min(1).required(),
	permission_id: Joi.number().integer().min(1).required(),
});

// ===== REMOVE ROLE PERMISSION =====
export const removeRolePermissionSchema = Joi.object({
	role_id: Joi.number().integer().min(1).required(),
	permission_id: Joi.number().integer().min(1).required(),
});

// ===== GET PERMISSIONS BY ROLE =====
export const roleIdOnlyParamSchema = Joi.object({
	role_id: Joi.number().integer().min(1).required(),
});
