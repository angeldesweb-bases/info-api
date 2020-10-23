import User from '../../models/Session/User';
import bcrypt from 'bcryptjs';
import { Login } from '../../middlewares/auth';

const SignUp = async (args) => {
    //ENCRYPTING PASSWORD
    const saltpass = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(args.password,saltpass,null);
    //SETTING HASHED PASSWORD IN THE ASRGUMENTS
    args.password = hashpass;
    try {
    //SAVING THE USER IN MONGODB
        const user = new User(args);
        const response = await user.save();
        console.log(response)
    //RETURN WHEN SUCCESS TRUE
        return{
            success:true,
            done:{
                status:200,
                message:'Usuario registrado exitosamente',
                user:response
            }
        }
    } catch (error) {
    //RETURN WHEN POST FAIL
        return {
            success:false,
            error : {
                path:'SignUp',
                message:'No se pudo realizar la petición'
            }
        }
    }
}

const SignIn = async (args) => {
    args.lastlogin = Date.now();
    try {
        const response = await Login(args);
        return {
            success:true,
            done:{
                status:200,
                message:'Petición realizada exitosamente',
            },
            token:response.token,
            user:response.user
        }
    } catch (error) {
        return {
            success:false,
            error:{
                path:'Login',
                status:500,
                message:'Problema de authenticación'
            }
        }
    }
}

const GetUser = async (args) => {
    const _id = args._id;
    try {
        const user = await User.findById(_id);
        if(!user){
            return {
                success:false,
                error:{
                    status:404,
                    path:'User',
                    messsage:'No se encontró el usuario'
                }
            }
        }
        return {
            success:true,
            done:{
                status:200,
                message:'Petición realizada con éxito'
            },
            user,
        }
    } catch (error) {
        return {
            error:{
                path:'User',
                status:500,
                message:'Error en la petición'
            }
        }
    }
}

const AllUsers = async () => {
    try {
        const usuarios = await User.find();
        if(!usuarios){
            return{
                success:false,
                error:{
                    status:404,
                    path:'Usuarios',
                    message:'No se encontraron registros'
                }
            }

        }
        return {
            success:true,
            done:{
                status:200,
                message:'Petición realizada satisfactoriamente'
            },
            users:usuarios
            }
    } catch (error) {
        return {
            success:false,
            error:{
                path:'Usuarios',
                status:500,
                message:'Error en la petición'
            }
        }
    }
}
export {
    SignUp,
    AllUsers,
    SignIn,
    GetUser
}