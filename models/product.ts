import { Model, Schema, Types, model } from "mongoose";

export interface IProduct {
    id: Number;
    title: String;
    price: Number;
    category: String;
    description: String;
    image: String;
    user: Types.ObjectId;
    createdAt: Date
};

const ProductSchema = new Schema<IProduct>({
    id: {
        type: Number,
        required: [true, "Id: is required"]
    },
    title: {
        type: String,
        required: [true, "Title: is required"]
    },
    price: {
        type: Number,
        required: [true, "Id: is required"]
    },
    category: {
        type: String,
        required: [true, "Category: is required"]
    },
    description: {
        type: String,
        required: [true, "Title: is required"]
    },
    image: {
        type: String,
        required: [true, "Image: is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;