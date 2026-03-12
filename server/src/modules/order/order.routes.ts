import { Router } from "express";
import { OrderController } from "../order/order.controller.js";
import { createOrderSchema, updateOrderSchema, orderIdParamSchema, orderUserIdParamSchema } from "../order/order.validator.js";
import { validateBody, validateParams } from "../../middlewares/validate.middleware.js";

const router = Router();

// ===== GET ALL =====
router.get("/", OrderController.getAll);

// ===== GET COUNT =====
router.get("/count", OrderController.count);

// ===== GET BY ID =====
router.get("/id/:id", validateParams(orderIdParamSchema), OrderController.getById);

// ===== GET BY USER =====
router.get("/user/:user_id", validateParams(orderUserIdParamSchema), OrderController.getByUser);

// ===== CREATE =====
router.post("/", validateBody(createOrderSchema), OrderController.create);

// ===== UPDATE =====
router.put("/id/:id", validateParams(orderIdParamSchema), validateBody(updateOrderSchema), OrderController.update);

router.patch("/id/:id", validateParams(orderIdParamSchema), validateBody(updateOrderSchema), OrderController.update);

// ===== DELETE =====
router.delete("/id/:id", validateParams(orderIdParamSchema), OrderController.delete);

export default router;
