import { Router } from "express";
import { verifyUser, login, register } from "../controllers/auth";
import { check } from "express-validator"
import { collectErrors } from "../middlewares/collectErrors";
import { emailExist } from "../helpers/validationsDB"

const router = Router()

router.post(
    "/register",
    [
        check("name", "name: required field").not().isEmpty(),
        check("email", "email: required field").isEmail(),
        check("password", "The password must be a minimum of 6 characters").isLength({min: 6}),
        check("email").custom(emailExist),
        collectErrors
    ],
 register);

 router.post(
    "/login",
    [
        check("email", "email: required field").not().isEmpty(),
        check("email", "email: invalid email").isEmail(),
        check("password", "The password must be a minimum of 6 characters").isLength({min: 6}),
        collectErrors
    ],
    login
 );

 router.patch(
    "/verify",
    [
        check("email", "email: required field").not().isEmpty(),
        check("email", "email: invalid email").isEmail(),
        check("code").not().isEmpty(),
        collectErrors
    ],
    verifyUser
 )


export default router