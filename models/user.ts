import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
    name: string;
    email: string;
    password: string;
    rol?: string;
    code?: string;
    verified?: string;
};

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Required field"]
    },
    email: {
        type: String,
        required: [true, "Required field"]
    },
    password: {
        type: String,
        required: [true, "Required field"]
    },
    rol: {
        type: String,
        default: ROLES.user
    },
    code: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, code, ...user} = this.toObject();
    return user
}

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;