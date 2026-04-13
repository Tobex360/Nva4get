const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const path = require("path");
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/ToDoRoutes')



require('dotenv').config();

const PORT = process.env.PORT || 9000;

const DB_URL = process.env.DB_URL;


//Enable cors
app.use(cors({
    origin:['http://localhost:5173',"https://nva4get.vercel.app"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}));

//Parse Json bodies
app.use(express.json());

//health route for uptime robot

app.get('/api/health',(req, res)=>{
    res.status(200).json({ status: 'ok' })
})


//Routes
app.use('/user', authRoutes);
app.use('/todo',toDoRoutes);

//Start Server
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})


//Connect To Mongoose
mongoose.connect(DB_URL).then((result)=>{
    console.log('succesfully connected to mongodb')
}).catch(err=>{
    console.error('MongoDB Connection Failed:');
    console.error('Error:', err.message);
    console.error('Full error:', err);
})

