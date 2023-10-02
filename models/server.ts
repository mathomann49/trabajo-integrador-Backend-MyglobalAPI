import express, {Express} from "express"
import cors from "cors"
import authRoutes from "../routes/auth"
import purchasesRoutes from "../routes/purchases"
import productsRoutes from "../routes/products"
import { dbConection } from "../db/config"

export class Server {

    app: Express
    port: string | number | undefined
    authPath: string
    purchasesPath: string
    productsPath: string

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/auth';
        this.purchasesPath = '/purchases';
        this.productsPath = '/products';
        
        this.connectDB()
        this.middlewares()
        this.routes()
    }

    async connectDB(): Promise<void> {
        await dbConection();
    }

    middlewares(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(): void {
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.purchasesPath, purchasesRoutes)
        this.app.use(this.productsPath, productsRoutes)
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en puerto ${this.port}`);
        })
    }
}