import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const mailerpass = process.env.PASSEMAILSERVICE

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'octopusstoreregister@gmail.com',
        pass: mailerpass
    },
    from: 'octopusstoreregister@gmail.com'
})

export const sendEmail = async (to: string, code: string): Promise<void> => {
    
    const mailOptions = {
        from: '"Octopus Store" octopusstoreregister@gmail.com',
        to,
        subject: 'Verification code for your Octopus Store account',
        text: `
        Your verification code to complete the registration of your 
        Octopus Store account is ${code}
        `
    }
    
    try {
       await transporter.sendMail(mailOptions);
       console.log("Correo enviado satisfactoriamente") 
    } catch (error) {
        console.error("Error al enviar correo", error)
    }
}