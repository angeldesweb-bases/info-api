import { SignUp , AllUsers , SignIn , GetUser } from '../../controllers/Session/users';


export default {
    Query: {
        AllUsers : async (parent,args,context) => {
            if(!context.user){
                return {
                    success:false,
                    error:{
                        path:'Login',
                        message:'No autorizado',
                        status:401
                    }
                };
            }
            const response = await AllUsers()
            return response;
        },
        GetUser : async (parent,args,context) => {
            if(!context.user){
                return {
                    success:false,
                    error:{
                        path:'Login',
                        message:'No autorizado',
                        status:401
                    }
                };
            }
            const response = await GetUser(args);
            return response
        }
    },
    Mutation : {
        SignUp : async (parent,args) => await SignUp(args),
        SignIn : async (parent,args) => await SignIn(args)
    }
}
