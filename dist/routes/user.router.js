import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { verifyRolers } from "../middlewares/verifyRolers.js";
import { UserRole } from "@prisma/client";
const router = Router();
router.post("/", verifyRolers(UserRole.ADMIN), userController.create);
router.delete("/", userController.delete);
router.put("/", userController.update);
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
export default router;
//# sourceMappingURL=user.router.js.map