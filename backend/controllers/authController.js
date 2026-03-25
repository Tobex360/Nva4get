const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/awtjwt');
const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

// async function googleLogin(req, res) {
//   try {
//     const { credential } = req.body;

//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     const { email, name } = payload;

//     const username = email.split("@")[0];

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({
//         firstname: name,
//         username,
//         email,
//         password: "google-auth"
//       });

//       await user.save();
//     }

//     const jwtToken = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '3h' }
//     );

//     return res.send({
//       userid: user._id,
//       username: user.username,
//       firstname: user.firstname,
//       email: user.email,
//       token: jwtToken
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Google login failed");
//   }
// }

async function googleLogin(req, res) {
  console.log("Body received:", req.body);
  console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID); // 👈 add this
  try {
    const { token } = req.body; // <-- matches your frontend

    if (!token) return res.status(400).json({ error: "Missing Google token" });

    const ticket = await client.verifyIdToken({
      idToken: token, // use token from frontend
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;
    const username = email.split("@")[0];

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        firstname: name,
        username,
        email,
        password: "google-auth"
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.json({
      userid: user._id,
      username: user.username,
      firstname: user.firstname,
      email: user.email,
      token: jwtToken
    });

  } catch (err) {
    console.error("Google login error:", err);
    res.status(400).json({ error: "Google login failed" });
  }
}

const AuthController = {
    registerUser,
    loginUser,
    googleLogin
}

module.exports = AuthController;