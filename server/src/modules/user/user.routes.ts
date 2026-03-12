import { Router } from "express";
import { UserController } from "../user/user.controller.js";
import {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
  queryUsersSchema,
  searchUserSchema,
  roleParamSchema
} from "../user/user.validator.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";

const router = Router();

/* ---------- SEARCH ---------- */

router.get("/search", validateQuery(searchUserSchema), UserController.search);

/* ---------- COUNT ---------- */

router.get("/count", UserController.count);

/* ---------- ROLE ---------- */

router.get("/role/:role_id", validateParams(roleParamSchema), UserController.getByRole);
router.get("/role/:role_id/count", validateParams(roleParamSchema), UserController.countByRole);

/* ---------- USERS ---------- */

router.get("/", validateQuery(queryUsersSchema), UserController.getAll);

router.get("/id/:id/full", validateParams(idParamSchema), UserController.getFullById);
router.get("/id/:id", validateParams(idParamSchema), UserController.getById);

router.post("/", validateBody(createUserSchema), UserController.create);

router.put("/id/:id",
  validateParams(idParamSchema),
  validateBody(updateUserSchema),
  UserController.update
);

router.patch("/id/:id",
  validateParams(idParamSchema),
  validateBody(updateUserSchema),
  UserController.update
);

router.delete("/id/:id",
  validateParams(idParamSchema),
  UserController.delete
);

export default router;