import { Router } from "express";
import { OrderItemController } from "../modules/orderItem/order_item.controller.js";
import {
	createOrderItemSchema,
	updateOrderItemSchema,
	orderItemIdParamSchema,
	orderItemOrderIdParamSchema,
} from "../modules/orderItem/order_item.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

// ===== GET ALL =====
router.get("/", OrderItemController.getAll);

// ===== GET COUNT =====
router.get("/count", OrderItemController.count);

// ===== GET BY ID =====
router.get("/:id", validateParams(orderItemIdParamSchema), OrderItemController.getById);

// ===== GET BY ORDER =====
router.get("/order/:order_id", validateParams(orderItemOrderIdParamSchema), OrderItemController.getByOrder);

// ===== CREATE =====
router.post("/", validateBody(createOrderItemSchema), OrderItemController.create);

// ===== UPDATE =====
router.put("/:id", validateParams(orderItemIdParamSchema), validateBody(updateOrderItemSchema), OrderItemController.update);

router.patch("/:id", validateParams(orderItemIdParamSchema), validateBody(updateOrderItemSchema), OrderItemController.update);

// ===== DELETE =====
router.delete("/:id", validateParams(orderItemIdParamSchema), OrderItemController.delete);

export default router;
