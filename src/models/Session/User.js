import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    cedula:{type:String,required:true,unique:true},
    nombre:{type:String,required:true},
    role:{type:String,enum:['Admin','Crew','Dev','View']},
    email:{type:String,required:true,lowercase:true,unique:true},
    password:{type:String,required:true},
    signdate:{type:Date,default:Date.now()},
    lastlogin:{type:Date}
});

export default mongoose.model('User',User);