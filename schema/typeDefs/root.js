import { gql } from 'apollo-server-express';

const root = gql`

    type Done {
        status:Int!
        message:String!
    }

    type Error {
        status:Int!
        message:String!
        path:String!
    }

    type Query {
        AllUsers:UserResponse!,
        GetUser(_id:ID):UserResponse!
    }

    type Mutation {
        SignUp(cedula:String!,nombre:String!,role:String!,email:String!password:String!):UserResponse!
        SignIn(cedula:String,password:String!,email:String):UserResponse!
    }

`;

export default root;