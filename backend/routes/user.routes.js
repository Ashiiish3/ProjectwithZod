const express = require("express");
const { userRegister, userLogin } = require("../controllers/user.controller");
const { registerSchema, loginSchema } = require("../validators/userValidators");
const validate = require("../middlewares/validate");

const userRouter = express.Router();

userRouter.post("/register", validate(registerSchema), userRegister);
userRouter.post("/login", validate(loginSchema), userLogin);

module.exports = userRouter;
