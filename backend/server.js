const express = require('express')
const connectDB = require('./db/connectDB')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const app = express()
app.use(express.json())
connectDB()
app.get('/test', (req, res)=>{
    res.send('chitra app server working')
})

app.use('/api/users',userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})


