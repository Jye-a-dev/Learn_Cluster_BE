import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller.js";
import { createPermissionSchema, updatePermissionSchema, idParamSchema, queryPermissionSchema } from "../validators/permission.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryPermissionSchema), PermissionController.getAll);
router.get("/count", PermissionController.count);
router.get("/:id", validateParams(idParamSchema), PermissionController.getById);

router.post("/", validateBody(createPermissionSchema), PermissionController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updatePermissionSchema), PermissionController.update);
router.patch("/:id", validateParams(idParamSchema), validateBody(updatePermissionSchema), PermissionController.update);
router.delete("/:id", validateParams(idParamSchema), PermissionController.delete);

export default router;
