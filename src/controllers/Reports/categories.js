import Category from '../../models/Reports/Category';

const AllCategories = async () => {
    try {
        const categories = await Category.find();
        if(!categories){
            return {
                success:false,
                error:{
                    path:'Categories',
                    message:'No se encontraron registros',
                    status:404
                }
            }
        }
        return{
            success:true,
            done:{
                status:200,
                message:'Petición realizada exitosamente'
            },
            categories
        }
    } catch (error) {
        return{
            success:false,
            error:{
                path:'Category',
                message:'No se pudo registrar la categoría',
                status:500
            } 
        }       
    }
}

const CreateCategory = async (args) =>{
    try {
        const category = new Category(args);
        const response = category.save();
        return{
            success:true,
            done:{
                status:200,
                message:'Registro realizado exitosamente'
            },
            category:response
        }
    } catch (error) {
        return{
            success:false,
            error:{
                path:'Category',
                message:'No se pudo registrar la categoría',
                status:500
            }
        }
    }
}

export {
    CreateCategory,
    AllCategories
}