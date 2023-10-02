import { Router } from "express";
import { getPurchases, createPurchases } from "../controllers/purchases";
import validateJWT from "../middlewares/validateJWT";
import { collectErrors } from "../middlewares/collectErrors";
import { isVerified } from "../middlewares/validateVerified";
import { check } from "express-validator";

const router = Router();

router.get("/",
    [
        validateJWT,
        collectErrors
    ],
    getPurchases)

router.post("/",
    [
        validateJWT,
        isVerified,
        check("subTotal", "subTotal: required").not().isEmpty(), 
        check("shippingCost", "shippingCost: required").not().isEmpty(), 
        check("total", "total: required").not().isEmpty(),
        check("items", "items: required").not().isEmpty(),
        check("shippingDetails", "shippingDetails: required").not().isEmpty(), 
        collectErrors 
    ],
    createPurchases)



export default router