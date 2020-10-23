import { CreateCategory , AllCategories } from '../../controllers/Reports/categories';

export default {
    Query : {
        AllCategories : async (parent,args,context) => {
            const response = await AllCategories();
            return response
        }
    },
    Mutation : {
        CreateCategory : async (parent,args,context) => {
            const response = await CreateCategory(args);
            return response
        }
    }
}