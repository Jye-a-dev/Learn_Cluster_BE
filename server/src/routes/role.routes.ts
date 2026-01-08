// src/routes/role.routes.ts
import { Router } from "express";
import { RoleController } from "../controllers/role.controller.js";
import { createRoleSchema, updateRoleSchema, roleIdParamSchema, queryRolesSchema } from "../validators/role.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryRolesSchema), RoleController.getAll);
router.get("/count", RoleController.count);
router.get("/:id", validateParams(roleIdParamSchema), RoleController.getById);

router.post("/", validateBody(createRoleSchema), RoleController.create);
router.put("/:id", validateParams(roleIdParamSchema), validateBody(updateRoleSchema), RoleController.update);
router.delete("/:id", validateParams(roleIdParamSchema), RoleController.delete);

export default router;
