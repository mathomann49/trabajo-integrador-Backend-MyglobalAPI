import { sendEmail } from "../mailer/mailer";
import User, { IUser } from "../models/user"

export const emailExist = async (email:string): Promise<void> => {
    const emailExist: IUser | null = await User.findOne({email});
    if (emailExist && emailExist.verified) {
        throw new Error(`The email ${email} is already registered`);   
    }

    if (emailExist && !emailExist.verified) {
        await sendEmail(email, emailExist.code as string)
        throw new Error(`The email ${email} is already registered. 
        The verification code was sent again to ${email}`);
    }
}