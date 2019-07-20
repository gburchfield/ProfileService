import express from 'express'
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { User } from "./Models/User";
import config from './config'
import typeDefs from './schema'
import {resolvers} from "./resolvers";


const server = new ApolloServer({
    schema: buildFederatedSchema([{typeDefs, resolvers}]),
    context: ({req}) => {
        let user = new User(req.headers)
        return {
            user
        }
    }
})

const app = express()

server.applyMiddleware({app})

app.listen({ port: config.port }, () =>
    console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
);