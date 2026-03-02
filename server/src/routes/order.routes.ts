import { Router } from "express";
import { OrderController } from "../modules/order/order.controller.js";
import { createOrderSchema, updateOrderSchema, orderIdParamSchema, orderUserIdParamSchema } from "../modules/order/order.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

// ===== GET ALL =====
router.get("/", OrderController.getAll);

// ===== GET COUNT =====
router.get("/count", OrderController.count);

// ===== GET BY ID =====
router.get("/:id", validateParams(orderIdParamSchema), OrderController.getById);

// ===== GET BY USER =====
router.get("/user/:user_id", validateParams(orderUserIdParamSchema), OrderController.getByUser);

// ===== CREATE =====
router.post("/", validateBody(createOrderSchema), OrderController.create);

// ===== UPDATE =====
router.put("/:id", validateParams(orderIdParamSchema), validateBody(updateOrderSchema), OrderController.update);

router.patch("/:id", validateParams(orderIdParamSchema), validateBody(updateOrderSchema), OrderController.update);

// ===== DELETE =====
router.delete("/:id", validateParams(orderIdParamSchema), OrderController.delete);

export default router;
