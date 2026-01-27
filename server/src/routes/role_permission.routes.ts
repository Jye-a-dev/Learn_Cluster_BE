import { Router } from "express";
import { RolePermissionController } from "../controllers/role_permission.controller.js";
import {
	addRolePermissionSchema,
	removeRolePermissionSchema,
	idParamSchema,
	roleParamSchema,
	permissionParamSchema,
	putRolePermissionSchema,
	patchRolePermissionSchema,
} from "../validators/role_permission.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

/* =========================
   GET ALL
========================= */
router.get("/", RolePermissionController.getAll);

/* =========================
   GET BY ID (PK)
========================= */
router.get("/:id", validateParams(idParamSchema), RolePermissionController.getById);

/* =========================
   GET BY ROLE
========================= */
router.get("/role/:role_id", validateParams(roleParamSchema), RolePermissionController.getByRoleId);

/* =========================
   GET BY PERMISSION
========================= */
router.get("/permission/:permission_id", validateParams(permissionParamSchema), RolePermissionController.getByPermissionId);

/* =========================
   COUNT
========================= */
router.get("/role/:role_id/count", validateParams(roleParamSchema), RolePermissionController.countByRole);

/* =========================
   CREATE (ARRAY)
========================= */
router.post("/", validateBody(addRolePermissionSchema), RolePermissionController.add);

/* =========================
   DELETE BY ID
========================= */
router.delete("/:id", validateParams(idParamSchema), RolePermissionController.removeById);

/* =========================
   DELETE (ARRAY role_id + permission_id)
========================= */
router.delete("/", validateBody(removeRolePermissionSchema), RolePermissionController.remove);

/* =========================
   DELETE BY ROLE
========================= */
router.delete("/role/:role_id", validateParams(roleParamSchema), RolePermissionController.removeByRole);

/* =========================
   DELETE BY PERMISSION
========================= */
router.delete("/permission/:permission_id", validateParams(permissionParamSchema), RolePermissionController.removeByPermission);
router.put("/:id", validateParams(idParamSchema), validateBody(putRolePermissionSchema), RolePermissionController.putById);

/* =========================
   UPDATE (PATCH)
========================= */
router.patch("/:id", validateParams(idParamSchema), validateBody(patchRolePermissionSchema), RolePermissionController.patchById);
export default router;
