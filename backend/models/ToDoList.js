const mongoose = require('mongoose');
const{Schema} = mongoose;

const toDoSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
    },
    isCompleted:{
        type:Boolean,
        required:true,
    },
    createdBy:{
        ref: "User",
        type:Schema.ObjectId,
        required: true
    }
},
{
    timestamps: true
});

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports=ToDo;