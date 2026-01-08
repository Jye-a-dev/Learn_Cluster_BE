import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { createUserSchema, updateUserSchema, idParamSchema, queryUsersSchema } from "../validators/user.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryUsersSchema), UserController.getAll);

router.get("/count", UserController.count);
router.get("/:id", validateParams(idParamSchema), UserController.getById);
router.get("/:id/full", validateParams(idParamSchema), UserController.getFullById);

router.post("/", validateBody(createUserSchema), UserController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateUserSchema), UserController.update);
router.delete("/:id", validateParams(idParamSchema), UserController.delete);

export default router;
