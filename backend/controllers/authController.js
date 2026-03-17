const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/awtjwt');
const User = require('../models/user');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

async function registerUser(req,res){
    let{firstname, lastname, username, email, password} = req.body;

    try{
        const duplicate = await User.find({username});
        if(duplicate && duplicate.length > 0){
            return res.status(400).send({message:'username already exists'});
        }
        let user = new User({
            firstname,
            lastname,
            username,
            email,
            password
        })
        const result = await user.save();
        console.log(result);
        res.status(201).send({message:'User Registered successfully! '});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

async function loginUser(req,res){
    try{
        const {username, password} = req.body;
        console.log("1. Received:", { username, password });


        const user = await User.findOne({username});
        console.log("2. User found:", user);

        if(!user){
            return res.status(400).send({message:'User not found'});
        }
        console.log("3. Stored password:", user.password); // 👈
        console.log("4. Incoming password:", password); // 👈
        const isPasswordValid = await user.comparePassword(password);
        console.log("5. Password valid:", isPasswordValid); // 👈 

        if(!isPasswordValid){
            return res.status(401).send({message:'Incorrect password'});
        }
        let token = await jwt.sign({userId:user?._id},secretKey,{expiresIn:'3h'});
        finalData ={
            userid:user?._id,
            username:user?.username,
            firstname:user?.firstname,
            lastname:user?.lastname,
            email:user?.email,
            token
        }
        res.send(finalData);

    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
}

const AuthController = {
    registerUser,
    loginUser
}

module.exports = AuthController;