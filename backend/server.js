const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const path = require("path");
const authRoutes = require('./routes/authRoutes');



require('dotenv').config();

const PORT = process.env.PORT || 9000;

const DB_URL = process.env.DB_URL;
app.use(cors());
app.use(express.json())

app.use('/user', authRoutes);


mongoose.connect(DB_URL).then((result)=>{
    console.log('succesfully connected to mongodb')
}).catch(err=>{
    console.error('❌ MongoDB Connection Failed:');
    console.error('Error:', err.message);
    console.error('Full error:', err);
})


app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})