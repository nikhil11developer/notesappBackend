const mongoose = require('mongoose')

const NotesSchema = mongoose.Schema({
    title:{type:String , required:true},
    description:{type:String , required:true},
    tag:{type:String , default:'Generated'},
    date:{type:Date , default:  Date.now},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user'}
})
//user is the name of the model
const Note=mongoose.model('note' , NotesSchema)
module.exports=Note


