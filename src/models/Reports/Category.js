import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Category = new Schema({
    clasificacion:{type:String,required:true},
    subclass:{type:String,required:true,unique:true}
});

export default mongoose.model('Category',Category);