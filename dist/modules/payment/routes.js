import { Router } from "express";
import { PaymentController } from "../payment/controller.js";
import { createPaymentSchema, updatePaymentSchema, paymentIdParamSchema, paymentOrderIdParamSchema } from "../payment/validators.js";
import { validateBody, validateParams } from "../../middlewares/validate.middleware.js";
const router = Router();
// ===== GET ALL =====
router.get("/", PaymentController.getAll);
// ===== COUNT =====
router.get("/count", PaymentController.count);
// ===== GET BY ID =====
router.get("/id/:id", validateParams(paymentIdParamSchema), PaymentController.getById);
// ===== GET BY ORDER =====
router.get("/order/:order_id", validateParams(paymentOrderIdParamSchema), PaymentController.getByOrder);
// ===== CREATE =====
router.post("/", validateBody(createPaymentSchema), PaymentController.create);
// ===== UPDATE =====
router.put("/id/:id", validateParams(paymentIdParamSchema), validateBody(updatePaymentSchema), PaymentController.update);
router.patch("/id/:id", validateParams(paymentIdParamSchema), validateBody(updatePaymentSchema), PaymentController.update);
// ===== DELETE =====
router.delete("/id/:id", validateParams(paymentIdParamSchema), PaymentController.delete);
export default router;
