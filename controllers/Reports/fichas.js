import Ficha from '../../models/Reports/Ficha';

const CreateFicha = async (args)=>{
    const ficha = new Ficha(args);
    try {
        const response = await ficha.save();
        return {
            success:true,
            done:{
                status:200,
                message:'Registrada exitosamente'
            },
            ficha:response
        }
    } catch (error) {
        return {
            success:false,
            error:{
                status:500,
                path:'Ficha',
                message:'Error al registrar'
            }
        }
    }
}

const AllFichas = async ()=>{
    try {
        const fichas = await Ficha.find().populate('clasificacion').populate('postedBy')
        if(!fichas.length){
            return {
                success:false,
                error:{
                    status:404,
                    path:'Ficha',
                    message:'Sin registros'
                }
            }
        }
        return {
            success:true,
            done:{
                status:200,
                message:'Consulta realizada'
            },
            fichas
        }
    } catch (error) {
        return {
            success:false,
            error:{
                status:500,
                path:'Ficha',
                message:'Error al registrar'
            }
        }
    }
}

const GetFicha = async (args)=>{
    let fichaid = args._id;
    try {
        const ficha = await Ficha.findById(fichaid).populate('clasificacion').populate('postedBy')
        if(!ficha){
            return {
                success:false,
                error:{
                    status:404,
                    path:'Ficha',
                    message:'Sin registros'
                }
            }
        }
        return {
            success:true,
            done:{
                status:200,
                message:'Consulta realizada'
            },
            ficha
        }
    } catch (error) {
        return {
            success:false,
            error:{
                status:500,
                path:'Ficha',
                message:'Error al registrar'
            }
        }
    }
}

const UpdateFicha = async (args)=>{
    let fichaid = args._id
    let update = args;
    try {
        const updated = await Ficha.findByIdAndUpdate(fichaid,update);
        return {
            status:200,
            success:true,
            message:'Registro actualizado',
            ficha:updated
        }
    } catch (error) {
        return {
            status:500,
            success:false,
            message:formatErrors({errors:response.errors})
        }
    }
}

const DeleteFicha = async (args)=>{
    let fichaid = args._id
    try {
        const ficha = await Ficha.findById(fichaid);
        if(!ficha){
            return{
                status:404,
                success:false,
                message:'No se encontró el registro'
            }
        }
        await ficha.remove();
        return{
            status:200,
            success:true,
            message:'Registro eliminado'
        }
    } catch (error) {
        return {
            status:500,
            success:false,
            message:formatErrors({errors:response.errors})
        }
    }
}

export {
    CreateFicha,
    AllFichas,
    GetFicha,
    UpdateFicha,
    DeleteFicha
}