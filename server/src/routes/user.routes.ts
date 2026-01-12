import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { createUserSchema, updateUserSchema, idParamSchema, queryUsersSchema, searchUserSchema, roleParamSchema } from "../validators/user.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryUsersSchema), UserController.getAll);

router.get("/count", UserController.count);
router.get("/:id", validateParams(idParamSchema), UserController.getById);
router.get("/:id/full", validateParams(idParamSchema), UserController.getFullById);

router.post("/", validateBody(createUserSchema), UserController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateUserSchema), UserController.update);
router.patch("/:id", validateParams(idParamSchema), validateBody(updateUserSchema), UserController.update);
router.delete("/:id", validateParams(idParamSchema), UserController.delete);
router.get("/search", validateQuery(searchUserSchema), UserController.search);

router.get("/role/:role_id", validateParams(roleParamSchema), UserController.getByRole);
router.get("/role/:role_id/count", validateParams(roleParamSchema), UserController.countByRole);

export default router;
