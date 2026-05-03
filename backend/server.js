import express from 'express'
import cors from 'cors';
import 'dotenv/config';
import { conectDB } from './config/db.js';

const app = express();
const port = 4000;

// MIDDELWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Data Base
conectDB();

//ROUTES
app.get('/',(req , res)=>{
    res.send("API Working");
}) 

app.listen(port ,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});