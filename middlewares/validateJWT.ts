import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers["x-token"] as string

    if (!token) {
        res.status(401).json({
            msg: "There is no token in the request"
        });
        return
    }

    try {
        const secretKey = process.env.SECRETKEY as string;
        const payload = jwt.verify(token, secretKey) as JwtPayload;

        const {id} = payload

        const confirmedUser: IUser | null = await User.findById(id);

        if (!confirmedUser) {
            res.status(404).json({
                msg: "The user was not found in the database"
            });
            return
        }
        
        req.body.confirmedUser = confirmedUser;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Invalid token"
        });
    }
}

export default  validateJWT