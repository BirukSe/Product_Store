import express from 'express'
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js'
dotenv.config();

const app=express();
const PORT=process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/products", productRoutes)
async function initDB(){
    try{
        await sql`
        create table if not exists products(
        id serial primary key,
        name varchar(255) not null,
        image varchar(255) not null,
        price decimal(10,2) not null,
        created_at timestamp default current_timestamp
        
        )
        
        `;
        console.log("db init");

    }catch(error){
        console.log(error);
    }
}
initDB().then(()=>{
    app.listen(3000, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
})

