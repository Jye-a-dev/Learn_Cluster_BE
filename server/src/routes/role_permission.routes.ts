// src/routes/role-permission.routes.ts
import { Router } from "express";
import { RolePermissionController } from "../controllers/role_permission.controller.js";
import { addRolePermissionSchema, removeRolePermissionSchema, roleIdOnlyParamSchema } from "../validators/role_permission.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();
router.get("/", RolePermissionController.getAll);

router.post("/", validateBody(addRolePermissionSchema), RolePermissionController.add);

router.get("/role/:role_id", validateParams(roleIdOnlyParamSchema), RolePermissionController.getByRoleId);

router.delete("/", validateBody(removeRolePermissionSchema), RolePermissionController.remove);

router.delete("/role/:role_id", validateParams(roleIdOnlyParamSchema), RolePermissionController.removeByRole);

export default router;
