import Joi from "joi";

// ===== CREATE ROLE =====
export const createRoleSchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	description: Joi.string().optional().allow(null, ""),
});

// ===== UPDATE ROLE =====
export const updateRoleSchema = Joi.object({
	name: Joi.string().min(2).max(50).optional(),
	description: Joi.string().optional().allow(null, ""),
}).min(1);

// ===== GET / DELETE ROLE BY ID =====
export const roleIdParamSchema = Joi.object({
	id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
});

// ===== QUERY ROLES (OPTIONAL) =====
export const queryRolesSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	search: Joi.string().optional().allow(""),
});
