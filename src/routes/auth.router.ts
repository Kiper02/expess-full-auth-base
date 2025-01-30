import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { loginValidation, newPasswordValidation, registerValidation, resetPasswordValidation } from "../middlewares/validations/authValidation.js";
import checkPasswordRepeat from "../middlewares/checkPasswordRepeat.js";
import { verifyRecaptcha } from "../middlewares/verifyRecaptcha.js";
import { verifyProvider } from "../middlewares/verifyProvider.js";

const router = Router();

router.post("/register",
    verifyRecaptcha,
    registerValidation,
    checkPasswordRepeat,
    authController.register
);

router.get("/oauth/callback/:provider",
    verifyProvider, 
    authController.callback
);

router.get("/connect/:provider",
    verifyProvider, 
    authController.connect
);
router.post("/login", 
    loginValidation,
    authController.login
);
router.post("/logout", authController.logout);
router.post("/password-recovery/reset", 
    verifyRecaptcha,
    resetPasswordValidation,
    authController.resetPassword
);
router.post("/password-recovery/new/:token", 
    verifyRecaptcha,
    newPasswordValidation,
    authController.newPassword
);
router.post("/email-confirmation", authController.newVerification );


export default router;