import mongoose from 'mongoose';
import { server  } from './app';

//PORT
//const port = process.env.PORT || 3001;
const db = process.env.DB || 'mongodb://localhost:27017/tempdb'
//STARTTING APP

const Start = async ()=>{
    try {
        //SERVER
        await mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
        await server.listen().then(({ url }) => {
            console.log(`Servidor corriendo en ${ url }`);
        })

    } catch (error) {
        console.log(error)
    }
}

Start();