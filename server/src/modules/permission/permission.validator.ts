import Joi from "joi";

export const createPermissionSchema = Joi.object({
	name: Joi.string().max(100).required(),
	description: Joi.string().optional().allow(null, ""),
});

export const updatePermissionSchema = Joi.object({
	name: Joi.string().max(100).optional(),
	description: Joi.string().optional().allow(null, ""),
}).min(1);

export const idParamSchema = Joi.object({
	id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
});


export const queryPermissionSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	keyword: Joi.string().max(100).optional(),
});