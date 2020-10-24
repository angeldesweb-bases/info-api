import mongoose from 'mongoose';
import { server  } from './app';

const db = process.env.MONGODB
//STARTTING APP

const Start = async ()=>{
    try {
        //SERVER
        await mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
        await server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
            console.log(`Servidor corriendo`);
        })

    } catch (error) {
        console.log(error)
        console.error(error)
    }
}

Start();