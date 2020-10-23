require('dotenv').config();
import cloudinary from 'cloudinary'
import { CreateFicha, AllFichas , GetFicha } from '../../controllers/Reports/fichas';

const processUpload = async upload =>{
    const { createReadStream } = await upload;
    const fileStream = createReadStream();
    cloudinary.v2.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET,
        upload_preset:process.env.CLOUDINARY_UPLOAD_PRESET
    });
    
    return new Promise((resolve,reject) => {
        const cloudStream = cloudinary.v2.uploader.upload_stream({folder:process.env.FOLDER},function(err,fileUploaded){
            if (err) {
                reject(err);
            }
            resolve(fileUploaded);
        });
        fileStream.pipe(cloudStream);
    })
}
export default {
    Query : {
        AllFichas : async (parent,args)=>{
            const response = await  AllFichas ();
            return response;
        },
        GetFicha : async (parent,args,context) => {
            const response = await GetFicha(args);
            return response
        }
    },
    Mutation : {
        CreateFicha : async (parent,args)=>{
            const response = await CreateFicha(args);
            return response;
        },
        singleUpload: async (parent, { file } ) => {
            console.log(file.file)
            const response = await processUpload(file.file)
            const {public_id,secure_url} = response
            return {id:public_id,url:secure_url}
        }
    }
}