import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {dbConnect} from './dbConnect/dbConnect.js';
import cors from 'cors';
import router from './Routes/mediaRoutes.js'
const app=express();

dotenv.config();

app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(router)
app.listen(5000,()=>
{
    console.log("Server is running");
    dbConnect()
})
