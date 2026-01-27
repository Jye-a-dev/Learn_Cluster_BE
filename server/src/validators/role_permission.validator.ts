import Joi from "joi";

/* =========================
   COMMON UUID SCHEMA
========================= */
const uuidSchema = Joi.string().guid({
	version: ["uuidv1", "uuidv4", "uuidv5"],
});

/* =========================
   ADD ROLE PERMISSIONS (ARRAY)
========================= */
export const addRolePermissionSchema = Joi.array()
	.items(
		Joi.object({
			role_id: uuidSchema.required(),
			permission_id: uuidSchema.required(),
		}),
	)
	.min(1)
	.unique((a, b) => a.role_id === b.role_id && a.permission_id === b.permission_id)
	.required();

/* =========================
   REMOVE ROLE PERMISSIONS (ARRAY)
========================= */
export const removeRolePermissionSchema = Joi.array()
	.items(
		Joi.object({
			role_id: uuidSchema.required(),
			permission_id: uuidSchema.required(),
		}),
	)
	.min(1)
	.unique((a, b) => a.role_id === b.role_id && a.permission_id === b.permission_id)
	.required();

/* =========================
   PARAM :id
========================= */
export const idParamSchema = Joi.object({
	id: uuidSchema.required(),
});

/* =========================
   PARAM :role_id
========================= */
export const roleParamSchema = Joi.object({
	role_id: uuidSchema.required(),
});

/* =========================
   PARAM :permission_id
========================= */
export const permissionParamSchema = Joi.object({
	permission_id: uuidSchema.required(),
});

/* =========================
   PUT BY ID (FULL UPDATE)
========================= */
export const putRolePermissionSchema = Joi.object({
	role_id: uuidSchema.required(),
	permission_id: uuidSchema.required(),
});

/* =========================
   PATCH BY ID (PARTIAL UPDATE)
========================= */
export const patchRolePermissionSchema = Joi.object({
	role_id: uuidSchema.allow(null).optional(),
	permission_id: uuidSchema.allow(null).optional(),
}).min(1);

/* =========================
   QUERY ROLE_PERMISSION (OPTIONAL)
========================= */
export const queryRolePermissionSchema = Joi.object({
	role_id: uuidSchema.optional(),
	permission_id: uuidSchema.optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
});

/* =========================
   GENERIC VALIDATOR (OPTIONAL USE)
========================= */
export function validateSchema<T>(schema: Joi.Schema<T>, data: unknown): T {
	const { error, value } = schema.validate(data, {
		abortEarly: false,
		stripUnknown: true,
	});

	if (error) {
		throw new Error(error.details.map((d) => d.message).join(", "));
	}

	return value as T;
}
