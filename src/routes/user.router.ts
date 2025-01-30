import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { verifyRolers } from "../middlewares/verifyRolers.js";
import { UserRole } from "@prisma/client";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import { updateUserValidation } from "../middlewares/validations/userValidation.js";

const router = Router();

router.post("/", 
    verifyRolers(UserRole.ADMIN),
    userController.create
);
router.delete("/", userController.delete);
router.get("/", userController.getAll);
router.get("/by-id/:id", 
    verifyAuth,
    verifyRolers('ADMIN'),
    userController.getOne
);
router.get("/profile/:id",
    verifyAuth, 
    userController.findProfile
);
router.put("/profile",
    updateUserValidation,
    userController.updateProfile
);

export default router;