import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import { ObjectId } from "mongoose";

export const postNewProduct = async (req: Request, res: Response) => {
    const { id, title, price, category, description, image }: IProduct = req.body;
    const userId: ObjectId = req.body.confirmedUser._id;
    
    const productData = {
        id,
        title,
        price,
        category,
        description,
        image,
        createdAt: new Date(),
        user: userId
    };

    const product = new Product(productData);

    await product.save();

    res.status(201).json({
        product
    })

}

export const getAllProducts = async (req:Request, res: Response) => {

    const products = await Product.find()

    res.status(200).json({
        products
    })

}
 
export const getProductById = async (req:Request, res: Response) => {

    const {id} = req.params

    const product: IProduct|null = await Product.findOne({id: id})

    if (!product) {
        res.status(404).json({
            msg: "Product not found in the database"
        })
        return
    }
    res.status(200).json({
        product
    })
}

export const deleteProduct = async (req:Request, res: Response) => {

    const {id} = req.params;

    const product = await Product.findOneAndDelete({id: id})

    if (!product) {
        res.status(404).json({
            msg: "Product not found in the database"
        })
        return
    }
    res.status(200).json({
        product
    })
}