import { Router } from "express";
import * as userController from "./user.controller.js";
import { asyncHandler } from "../../utils/errorHandling.js";
// import { validation } from "../../middleware/validation.js";
import * as userValidation from './user.validation.js'
import { validation } from "../../middleware/validation.js";

const router = Router();

router.post("/",validation(userValidation.signupSchema),asyncHandler(userController.signUp));

router.post("/login",validation(userValidation.loginSchema) ,asyncHandler(userController.login));

export default router;
