import { ApolloServer } from 'apollo-server';
import { typeDefs , resolvers } from './schema';
import {  getUser } from './middlewares/auth';
require('dotenv').config();

//SETTING SCHEMA IN SERVER
const server = new ApolloServer({
    cors:true,
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || '';
        // try to retrieve a user with the token
        const user = await getUser(token);
        return { user }
    }
});   


export {server}

