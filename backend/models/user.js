const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
});


userSchema.pre("save",async function(){
    const user = this;
    console.log("Pre-save hook running, isModified:", user.isModified('password'));
    console.log("Password before hash:", user.password); // 👈
    if(!user.isModified('password')) return;
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    console.log("Password after hash:", user.password); // 👈
});

userSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password,this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;