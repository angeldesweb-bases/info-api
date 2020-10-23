import { gql } from 'apollo-server-express';

const Category = gql`

    type Category {
        _id:ID!
        clasificacion:String!
        subclass:String!
    }

    type CatResponse {
        success:Boolean!
        done:Done
        error:Error
        category:Category
        categories:[Category]
    }
    extend type Query {
        AllCategories:CatResponse!
    }

    extend type Mutation {
        CreateCategory(clasificacion:String!,subclass:String!):CatResponse!
    }
`;

export default Category;