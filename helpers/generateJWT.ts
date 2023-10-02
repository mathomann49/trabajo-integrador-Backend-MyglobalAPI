import jwt from "jsonwebtoken"

export const generateJWT = (id: string = ""): Promise<string> => {
    return new Promise((res, rej) => {
        const payload = {id}

        jwt.sign(
            payload,
            process.env.SECRETKEY as string,
            {
                expiresIn: "6h"
            },
            (err: Error | null, token: string | undefined) =>{
                if (err) {
                    console.log(err);
                    rej("Could not generate JWT")  
                } else {
                    res(token as string)
                }
            }
        )

    })
} 