import { gql } from 'apollo-server-express';

const User = gql`

    type User {
        _id:ID!
        cedula:String!
        nombre:String!
        role:String!
        email:String!
        password:String!
        signdate:String
        lastlogin:String
    }

    type UserResponse {
        success:Boolean!
        done:Done
        error:Error
        token:String
        user:User
        users:[User]
    }


`;

export default User;