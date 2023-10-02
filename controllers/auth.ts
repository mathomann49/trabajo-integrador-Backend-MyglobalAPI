import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs"
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring"
import { sendEmail } from "../mailer/mailer";
import { generateJWT } from "../helpers/generateJWT";

export const register = async (req: Request, res: Response) => {
    const {name, email, password, rol}: IUser = req.body

    const user = new User({name, email, password, rol});

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    const adminKey = req.headers["admin-key"];

    if (adminKey === process.env.KEYFORADMIN) {
        user.rol = ROLES.admin
    }

    const newCode = randomstring.generate(6);

    user.code = newCode

    await user.save();

    await sendEmail(email, newCode);

    res.status(201).json({
        user
    })
}

export const login = async(req: Request, res: Response): Promise<void> => {

    const {email, password}: IUser = req.body;

    try {

        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({
                msg: "email not found in data base"
            });
            return
            
        }

        const validatePassword = bcryptjs.compareSync(password, user.password);

        if (!validatePassword) {
            res.status(401).json({
                msg: "Incorrect Password"
            });
            return 
        };

        const token = await generateJWT(user.id);

        res.status(202).json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        });
    }

}

export const verifyUser = async (req: Request, res: Response) => {

const {email, code} = req.body;

try {
    const user = await User.findOne({email});

    if (!user) {
        res.status(404).json({
            msg: "email not found in data base"
        });
        return; 
    }

    if (user.verified) {
        res.status(400).json({
            msg: "User verified"
        });
        return;
    }

    if (code !== user.code) {
        res.status(401).json({
            msg: "incorrect code"
        });
        return;
    }

    await User.findOneAndUpdate(
        {email},
        {verified: true}
    );

    res.status(200).json({
        msg: "Successfully verified user"
    })

} catch (error) {
    console.log(error);
        res.status(500).json({
            msg: "Server error"
        });
}

}