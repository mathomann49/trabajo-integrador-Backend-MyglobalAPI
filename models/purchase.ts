import { Model, Schema, Types, model } from "mongoose";

interface IShippingDetails {
    fullname: String;
    streetAddress: String;
    city: String;
    state: String;
    phoneNumber: String;
}

interface Iitem {
    id: Number;
    price: Number;
    quantity: Number;
    title: String;
}

export interface IPurchase {
    createdAt: Date;
    user: Types.ObjectId;
    subTotal: Number;
    shippingCost: Number;
    total: Number;
    items: Iitem[];
    shippingDetails: IShippingDetails;
};

const PurchaseSchema = new Schema<IPurchase>({
   createdAt: {
    type: Date,
    default: Date.now,
   },
   user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   subTotal: {
    type: Number,
    required: true,
   },
   shippingCost: {
    type: Number,
    required: true,
   },
   total: {
    type: Number,
    required: true,
   },
   items: {
    type: [{
        id: {
            type: Number,
            required: true,  
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    }],
    required: true,           
   },
   shippingDetails: {
    fullname: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    }, 
   },
});

const Purchase: Model<IPurchase> = model<IPurchase>("Purchase", PurchaseSchema);

export default Purchase;