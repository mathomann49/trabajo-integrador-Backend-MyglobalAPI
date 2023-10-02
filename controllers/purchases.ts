import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Purchase, { IPurchase } from "../models/purchase";

export const getPurchases = async (req: Request, res: Response) => {
    const userId: ObjectId = req.body.confirmedUser._id;

    const ask = { user: userId};

    const purchases = await Purchase.find(ask)

    res.status(200).json({
        data: [
            ...purchases
        ]
    })
}

export const createPurchases = async (req: Request, res: Response) => {
    const userId: ObjectId = req.body.confirmedUser._id;
    const purchaseData: IPurchase = req.body

    const data = {
        ...purchaseData,
        user: userId,
        createdAt: new Date(),
    }

    const purchase = new Purchase(data);

    await purchase.save();

    res.status(201).json({
        purchase
    })
}