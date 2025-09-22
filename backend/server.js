import express from "express";
import companyRoute from "./routes/companyRoute.js";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import cors from 'cors';

dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())


server.use('/',(req,res)=>{
    res.send('hello grafferId')
})

server.use('/company', companyRoute)
// server.use('/review', reviewRoute)

const PORT = 5000;

connectDB().then(()=>{
    server.listen(PORT, () => {
        console.log('server started on port', PORT)
    })
}).catch((err)=>{console.log(err)})
