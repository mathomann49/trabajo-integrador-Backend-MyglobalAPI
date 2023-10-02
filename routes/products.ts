import { Router } from "express";
import { deleteProduct, getAllProducts, getProductById, 
    postNewProduct } from "../controllers/products";
import validateJWT from "../middlewares/validateJWT";
import { isAdmin } from "../middlewares/validateRol";
import { collectErrors } from "../middlewares/collectErrors";
import { check } from "express-validator";

const router = Router();

router.post("/",
    [
        validateJWT,
        isAdmin,
        check("id", "Id: required").not().isEmpty(), 
        check("title", "Title: required").not().isEmpty(), 
        check("price", "Price: required").not().isEmpty(),
        check("category", "Category: required").not().isEmpty(),
        check("description", "Description: required").not().isEmpty(), 
        check("image", "Image: required").not().isEmpty(), 
        collectErrors
    ],
    postNewProduct
)

router.get("/", getAllProducts)

router.get("/:id", getProductById)

router.delete("/:id",
[
    validateJWT,
    isAdmin,
    
    collectErrors
],
 deleteProduct)

export default router