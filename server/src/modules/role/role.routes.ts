// src/routes/role.routes.ts
import { Router } from "express";
import { RoleController } from "../role/role.controller.js";
import { createRoleSchema, updateRoleSchema, roleIdParamSchema, queryRolesSchema } from "../role/role.validator.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryRolesSchema), RoleController.getAll);

router.get("/count", RoleController.count);

router.get("/id/:id", validateParams(roleIdParamSchema), RoleController.getById);

router.post("/", validateBody(createRoleSchema), RoleController.create);

router.put("/id/:id", validateParams(roleIdParamSchema), validateBody(updateRoleSchema), RoleController.update);
router.patch("/id/:id", validateParams(roleIdParamSchema), validateBody(updateRoleSchema), RoleController.update);
router.delete("/id/:id", validateParams(roleIdParamSchema), RoleController.delete);

export default router;
