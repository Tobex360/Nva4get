const jwt = require('../middleware/awtjwt');
const User = require('../models/user');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

async function registerUser(req,res){
    let{firstname, lastname, username, email, password} = req.body;

    try{
        const duplicate = await User.find({username});
        if(duplicate && duplicate.length > 0){
            return res.status(400).sebd({message:'username already exists'});
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
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).send({message:'Authentication Failed'});
        }
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).send({message:'Authentication Failed'});
        }
        let token = await jwt.toString({userId:user?._id},secretKey,{expiresIn:'3h'});
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