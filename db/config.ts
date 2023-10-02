import mongoose from "mongoose";

export const dbConection = async(): Promise<void> => {
    try {

        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("The URL is not correctly defined in the environment variables");  
        }
        await mongoose.connect(dbURL); 
    } catch (error) {
        console.log(error);
        throw new Error("Error when starting the database");
        
    }
}