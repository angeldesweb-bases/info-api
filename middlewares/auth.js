import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import User from '../models/Session/User';
require('dotenv').config();

const secret = process.env.SECRET;

const createToken = async (usuario) => {
    const payload = {user:usuario._id,role:usuario.role}
    const newToken = await jwt.encode(payload,secret);
    return [newToken]
}

const checkToken = async (token) => {
    let idUser = null;
    try {
        const { user } = await jwt.decode(token,secret);
        idUser = user
    } catch (error) {
        return {}
    }
    const usuario = Usuario.findById(idUser);
    const [newToken] =  await createToken(usuario);

    return {
        user:usuario._id,
        token:newToken
    }
}


const getUser = async (token) => {
    if(token){
        try {
            const { user } = await jwt.decode(token,secret);
            return user
        } catch (error) {
            const newToken = await checkToken(token);
            return { user:newToken.user }
        }
    }
}

const Login = async (args) => {
    const { cedula , password } = args;
    const usuario = await User.findOne({cedula});
    if(!usuario){
        return {
            errors:[{path:'cedula',message:'Usuario no existe'}]
        }
    }
    const compared = await bcrypt.compare(password,usuario.password);
    if(!compared){
        return { 
            errors:[{path:'password',message:'Contraseña inválida'}]
        }
    }
    const [newToken] = await createToken(usuario);
    return {token:newToken,user:usuario}
}
export {
    getUser,
    Login
}
